#!/usr/bin/env node
/**
 * Compare docs/public-api.json against VueCore Import Map and JS entrypoints.
 * Read-only. Exit 1 on mismatch.
 */

import { readFileSync, existsSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')
const errors = []

function fail(message) {
  errors.push(message)
}

function read(relPath) {
  const abs = join(root, relPath)
  if (!existsSync(abs)) {
    fail(`Missing file: ${relPath}`)
    return null
  }
  return readFileSync(abs, 'utf8')
}

function readJson(relPath) {
  const raw = read(relPath)
  if (!raw) return null
  try {
    return JSON.parse(raw)
  } catch (e) {
    fail(`Invalid JSON in ${relPath}: ${e.message}`)
    return null
  }
}

function loadManifest() {
  const manifest = readJson('docs/public-api.json')
  if (!manifest) return null
  return manifest
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function compareExactSet(label, actualValues, expectedValues) {
  const actual = new Set(actualValues)
  const expected = new Set(expectedValues)

  for (const value of expected) {
    if (!actual.has(value)) {
      fail(`${label}: missing '${value}'`)
    }
  }
  for (const value of actual) {
    if (!expected.has(value)) {
      fail(`${label}: unexpected '${value}' (update manifest or source)`)
    }
  }
}

function stripLineComments(text) {
  return text
    .split('\n')
    .map((line) => {
      const idx = line.indexOf('//')
      return idx === -1 ? line : line.slice(0, idx)
    })
    .join('\n')
}

function stripComments(text) {
  return stripLineComments(text).replace(/\/\*[\s\S]*?\*\//g, ' ')
}

function hasPhpArrayKey(source, key) {
  return new RegExp(`['"]${escapeRegExp(key)}['"]\\s*=>`).test(source)
}

function isIdentifierDeclared(code, name) {
  const escaped = escapeRegExp(name)
  return (
    new RegExp(`\\bfunction\\s+${escaped}\\s*\\(`).test(code) ||
    new RegExp(`\\b(?:const|let|var)\\s+${escaped}\\b`).test(code) ||
    new RegExp(`(?:^|[,{\\n])\\s*${escaped}\\s*(?=[:,}\\n])`, 'm').test(code)
  )
}

function phpReferencesClass(source, fqcn) {
  const shortName = fqcn.split('\\').at(-1)
  return source.includes(`\\${fqcn}`) || source.includes(`${shortName}::class`)
}

function addNamedExportFromClause(named, cleaned) {
  const defaultAs = cleaned.match(/^default\s+as\s+([A-Za-z_$][\w$]*)$/)
  if (defaultAs) {
    named.add(defaultAs[1])
    return
  }

  const asMatch = cleaned.match(/^[A-Za-z_$][\w$]*\s+as\s+([A-Za-z_$][\w$]*)$/)
  if (asMatch) {
    named.add(asMatch[1])
    return
  }

  const plain = cleaned.match(/^([A-Za-z_$][\w$]*)$/)
  if (plain) {
    named.add(plain[1])
  }
}

/**
 * Collect export names from a barrel/source file via static patterns.
 * Supports:
 *   export { a, b as c } from '...'
 *   export { default as X } from '...'
 *   export function name
 *   export default name / export default function
 *   export *
 */
function parseExports(source, relPath) {
  const named = new Set()
  let hasStar = false
  let hasDefault = false
  let defaultName = null

  const code = stripLineComments(source)

  for (const match of code.matchAll(/export\s*\{([^}]+)\}(?:\s*from\s*['"][^'"]+['"])?/g)) {
    for (const part of match[1].split(',')) {
      const cleaned = part.replace(/\/\*[\s\S]*?\*\//g, '').trim()
      if (cleaned) {
        addNamedExportFromClause(named, cleaned)
      }
    }
  }

  if (/export\s*\*\s*from\s*['"]/.test(code)) {
    hasStar = true
  }

  if (/export\s+default\b/.test(code)) {
    hasDefault = true
    const defFn = code.match(/export\s+default\s+(?:async\s+)?function\s+([A-Za-z_$][\w$]*)/)
    const defName = code.match(/export\s+default\s+([A-Za-z_$][\w$]*)\s*$/m)
    if (defFn) defaultName = defFn[1]
    else if (defName) defaultName = defName[1]
  }

  for (const match of code.matchAll(/export\s+(?:async\s+)?function\s+([A-Za-z_$][\w$]*)/g)) {
    named.add(match[1])
  }

  for (const match of code.matchAll(/export\s+class\s+([A-Za-z_$][\w$]*)/g)) {
    named.add(match[1])
  }

  for (const match of code.matchAll(/export\s+(?:const|let|var)\s+([A-Za-z_$][\w$]*)/g)) {
    named.add(match[1])
  }

  if (named.size === 0 && !hasStar && !hasDefault) {
    fail(`Could not parse any exports from ${relPath}`)
  }

  return { named, hasStar, hasDefault, defaultName }
}

function checkPackage(manifest) {
  const packageApi = manifest.package
  const npmPackage = readJson(packageApi.npmSource)
  if (
    npmPackage &&
    (npmPackage.name !== packageApi.npmName || packageApi.name !== packageApi.npmName)
  ) {
    fail(
      `Package name mismatch: manifest=${packageApi.npmName}, package.json=${npmPackage.name}`
    )
  }

  const modxConfig = read(packageApi.modxSource)
  if (
    modxConfig &&
    !new RegExp(`['"]name['"]\\s*=>\\s*['"]${escapeRegExp(packageApi.modxPackage)}['"]`).test(
      modxConfig
    )
  ) {
    fail(`MODX package name '${packageApi.modxPackage}' missing in ${packageApi.modxSource}`)
  }
}

function checkCanonicalDocs(manifest) {
  for (const rel of manifest.canonicalDocs || []) {
    if (!existsSync(join(root, rel))) {
      fail(`Canonical doc missing: ${rel}`)
    }
  }
  const guide = read('DEVELOPER_GUIDE.md')
  if (guide && !guide.includes('docs/PUBLIC_API.md') && !guide.includes('PUBLIC_API.md')) {
    fail('DEVELOPER_GUIDE.md must link to docs/PUBLIC_API.md')
  }
  const publicDoc = read('docs/PUBLIC_API.md')
  if (publicDoc && !publicDoc.includes('public-api.json')) {
    fail('docs/PUBLIC_API.md must reference public-api.json')
  }
}

function getImportMapExpression(importsBlock, specifier) {
  const pattern = new RegExp(
    `['"]${escapeRegExp(specifier)}['"]\\s*=>\\s*([^,\\n]+)`,
    'm'
  )
  return importsBlock.match(pattern)?.[1]?.replace(/\s+/g, ' ').trim() || null
}

function checkImportMapSpecifiersInPhp(php, manifest, publicSpecifiers, internalSpecifiers) {
  for (const key of publicSpecifiers) {
    if (!php.includes(`'${key}'`)) {
      fail(`Import Map missing public specifier ${key} in ${manifest.importMap.source}`)
    }
  }
  for (const key of internalSpecifiers) {
    if (!php.includes(`'${key}'`)) {
      fail(`Import Map missing registered internal specifier ${key}`)
    }
  }
}

function checkModuleImportMapAliases(importsBlock, manifest, publicSpecifiers) {
  for (const mod of Object.values(manifest.modules || {})) {
    if (!publicSpecifiers.includes(mod.specifier)) {
      fail(`Module specifier '${mod.specifier}' is not public in the Import Map`)
    }

    const sourceExpression = getImportMapExpression(importsBlock, mod.specifier)
    for (const alias of mod.aliases || []) {
      if (!publicSpecifiers.includes(alias)) {
        fail(`Module alias '${alias}' is not public in the Import Map`)
        continue
      }
      const aliasExpression = getImportMapExpression(importsBlock, alias)
      if (sourceExpression && aliasExpression && sourceExpression !== aliasExpression) {
        fail(`Module alias '${alias}' does not resolve to the same asset as '${mod.specifier}'`)
      }
    }
  }
}

function checkImportMap(manifest) {
  const php = read(manifest.importMap.source)
  if (!php) return

  const publicSpecifiers = manifest.importMap.publicSpecifiers
  const internalSpecifiers = manifest.importMap.internalSpecifiers || []
  const importsBlock = php.match(/'imports'\s*=>\s*\[([\s\S]*?)\]\s*\}/)

  if (importsBlock) {
    const found = [...importsBlock[1].matchAll(/'([^']+)'\s*=>/g)].map((match) => match[1])
    compareExactSet(
      'Import Map specifiers',
      found,
      [...publicSpecifiers, ...internalSpecifiers]
    )
    checkModuleImportMapAliases(importsBlock[1], manifest, publicSpecifiers)
    return
  }

  checkImportMapSpecifiersInPhp(php, manifest, publicSpecifiers, internalSpecifiers)
}

function checkReturnKeys(id, mod, source) {
  if (!mod.returnKeys) return

  const code = stripComments(source)
  for (const key of mod.returnKeys) {
    if (!isIdentifierDeclared(code, key)) {
      fail(`${id}: return key '${key}' is not declared in ${mod.source}`)
    }
  }
}

function checkModule(id, mod) {
  const source = read(mod.source)
  if (!source) return

  const parsed = parseExports(source, mod.source)

  if (mod.mode === 'star-plus-default') {
    if (!parsed.hasStar) {
      fail(`${id}: expected export * in ${mod.source}`)
    }
    if (!parsed.hasDefault) {
      fail(`${id}: expected default export in ${mod.source}`)
    }
    return
  }

  if (mod.mode !== 'exact-named') {
    fail(`${id}: unsupported module mode '${mod.mode}'`)
    return
  }

  compareExactSet(`${id} named exports`, [...parsed.named], mod.namedExports || [])

  const wantDefault = Boolean(mod.defaultExport)
  if (wantDefault !== parsed.hasDefault) {
    fail(
      `${id}: default export mismatch in ${mod.source} (manifest=${wantDefault}, file=${parsed.hasDefault})`
    )
  }
  if (
    wantDefault &&
    typeof mod.defaultExport === 'string' &&
    parsed.defaultName &&
    parsed.defaultName !== mod.defaultExport
  ) {
    fail(
      `${id}: default export name is '${parsed.defaultName}', manifest expects '${mod.defaultExport}'`
    )
  }

  checkReturnKeys(id, mod, source)
}

function checkPhp(manifest) {
  const php = manifest.php
  const core = read(php.coreSource)
  if (!core) return

  const actualMethods = [...core.matchAll(/public function\s+([A-Za-z_][A-Za-z0-9_]*)\s*\(/g)]
    .map((match) => match[1])
    .filter((method) => method !== '__construct')
  compareExactSet('PHP public methods', actualMethods, php.publicMethods)

  for (const constant of php.publicConstants || []) {
    if (!new RegExp(`public const ${constant}\\b`).test(core)) {
      fail(`PHP public constant missing: ${constant} in ${php.coreSource}`)
    }
  }

  const bootstrap = read(php.bootstrap)
  if (!bootstrap) return

  if (!bootstrap.includes(`'${php.serviceKeys.canonical}'`)) {
    fail(`Bootstrap missing canonical service key '${php.serviceKeys.canonical}'`)
  }
  for (const alias of php.serviceKeys.aliases || []) {
    if (!bootstrap.includes(`'${alias}'`)) {
      fail(`Bootstrap missing service alias '${alias}'`)
    }
  }

  if (!phpReferencesClass(bootstrap, php.serviceClass)) {
    fail(`PHP service class '${php.serviceClass}' missing in ${php.bootstrap}`)
  }

  const coreClass = php.coreClass.split('\\').at(-1)
  if (!new RegExp(`class\\s+${escapeRegExp(coreClass)}\\b`).test(core)) {
    fail(`PHP core class '${php.coreClass}' missing in ${php.coreSource}`)
  }
}

function checkBrowser(manifest, browserSource) {
  if (!browserSource.includes(`window.${manifest.browser.global}`)) {
    fail(`${manifest.browser.source} must inject window.${manifest.browser.global}`)
  }
  for (const key of manifest.browser.keys) {
    if (!hasPhpArrayKey(browserSource, key)) {
      fail(`Browser global key '${key}' not found in ${manifest.browser.source}`)
    }
  }

  const payload = browserSource.match(/\$themePayload\s*=\s*json_encode\(\s*\[([\s\S]*?)\]\s*,/)
  if (payload) {
    const actualKeys = [...payload[1].matchAll(/['"]([^'"]+)['"]\s*=>/g)].map(
      (match) => match[1]
    )
    compareExactSet('Browser global keys', actualKeys, manifest.browser.keys)
  } else {
    fail(`Browser global payload not found in ${manifest.browser.source}`)
  }

  for (const method of manifest.browser.methods || []) {
    if (!browserSource.includes(method)) {
      fail(`Browser global method '${method}' not found in ${manifest.browser.source}`)
    }
  }

  if ((manifest.browser.methods || []).length > 0) {
    if (!browserSource.includes('VueToolsCompat.create')) {
      fail(`${manifest.browser.source} must call VueToolsCompat.create for Compatibility API`)
    }
    if (!browserSource.includes('compat.min.js')) {
      fail(`${manifest.browser.source} must load js/mgr/compat.min.js`)
    }
  }
}

function checkSettings(manifest) {
  for (const [fullKey, setting] of Object.entries(manifest.settings || {})) {
    const shortKey = fullKey.split('.').at(-1)
    const settingSource = read(setting.source)
    if (settingSource) {
      if (!hasPhpArrayKey(settingSource, shortKey)) {
        fail(`Setting '${fullKey}' missing in ${setting.source}`)
      }
      if (
        !new RegExp(`['"]value['"]\\s*=>\\s*['"]${escapeRegExp(setting.default)}['"]`).test(
          settingSource
        )
      ) {
        fail(`Setting '${fullKey}' default '${setting.default}' missing in ${setting.source}`)
      }
    }

    const valuesSource = read(setting.valuesSource)
    if (valuesSource) {
      const data = valuesSource.match(/\bdata\s*:\s*(\[[^\n]+\])/)
      const actualValues = [
        ...(data?.[1] || '').matchAll(
          /\[\s*['"][^'"]+['"]\s*,\s*['"]([^'"]+)['"]\s*\]/g
        )
      ].map((match) => match[1])
      if (!data) {
        fail(`Setting values data not found in ${setting.valuesSource}`)
      }
      compareExactSet(`Setting '${fullKey}' values`, actualValues, setting.values)
    }
  }
}

function checkCss(manifest) {
  const guide = read('DEVELOPER_GUIDE.md') || ''
  const iso = manifest.css.isolationClass
  if (!guide.includes(`.${iso}`) && !guide.includes(`class="${iso}"`)) {
    fail(`DEVELOPER_GUIDE.md must document .${iso}`)
  }

  const isolationSource = read(manifest.css.isolationSource)
  if (isolationSource && !isolationSource.includes(`.${iso}`)) {
    fail(`CSS isolation class '.${iso}' missing in ${manifest.css.isolationSource}`)
  }

  const darkSource = read(manifest.css.darkSource)
  if (darkSource && !darkSource.includes(`.${manifest.css.darkClass}`)) {
    fail(`CSS dark class '.${manifest.css.darkClass}' missing in ${manifest.css.darkSource}`)
  }
}

function checkInternalPaths(manifest) {
  for (const relPath of manifest.internal?.paths || []) {
    if (!existsSync(join(root, relPath))) {
      fail(`Declared internal path missing: ${relPath}`)
    }
  }
}

function checkBrowserCssSettings(manifest) {
  const browserSource = read(manifest.browser.source)
  if (!browserSource) return

  checkBrowser(manifest, browserSource)
  checkSettings(manifest)
  checkCss(manifest)
  checkInternalPaths(manifest)
}

function main() {
  const manifest = loadManifest()
  if (!manifest) {
    console.error(errors.join('\n'))
    process.exit(1)
  }

  if (!Number.isInteger(manifest.version) || manifest.version < 1) {
    fail('Manifest version must be a positive integer')
  }

  checkPackage(manifest)
  checkCanonicalDocs(manifest)
  checkImportMap(manifest)

  for (const [id, mod] of Object.entries(manifest.modules || {})) {
    checkModule(id, mod)
  }

  checkPhp(manifest)
  checkBrowserCssSettings(manifest)

  if (errors.length) {
    console.error(`public-api check failed (${errors.length}):\n`)
    for (const e of errors) {
      console.error(`  - ${e}`)
    }
    process.exit(1)
  }

  console.log('public-api check passed')
}

main()
