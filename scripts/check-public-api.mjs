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

function loadManifest() {
  const raw = read('docs/public-api.json')
  if (!raw) return null
  try {
    return JSON.parse(raw)
  } catch (e) {
    fail(`Invalid JSON in docs/public-api.json: ${e.message}`)
    return null
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

  // Ignore full-line // comments so commented-out exports are not counted
  const code = stripLineComments(source)

  for (const match of code.matchAll(/export\s*\{([^}]+)\}(?:\s*from\s*['"][^'"]+['"])?/g)) {
    const parts = match[1].split(',')
    for (const part of parts) {
      const cleaned = part.replace(/\/\*[\s\S]*?\*\//g, '').trim()
      if (!cleaned) continue

      const defaultAs = cleaned.match(/^default\s+as\s+([A-Za-z_$][\w$]*)$/)
      if (defaultAs) {
        named.add(defaultAs[1])
        continue
      }

      const asMatch = cleaned.match(/^[A-Za-z_$][\w$]*\s+as\s+([A-Za-z_$][\w$]*)$/)
      if (asMatch) {
        named.add(asMatch[1])
        continue
      }

      const plain = cleaned.match(/^([A-Za-z_$][\w$]*)$/)
      if (plain) {
        named.add(plain[1])
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

function checkImportMap(manifest) {
  const php = read(manifest.importMap.source)
  if (!php) return

  const publicSpecifiers = manifest.importMap.publicSpecifiers
  const internalSpecifiers = manifest.importMap.internalSpecifiers || []

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

  const importsBlock = php.match(/'imports'\s*=>\s*\[([\s\S]*?)\]\s*\}/)
  if (importsBlock) {
    const found = [...importsBlock[1].matchAll(/'([^']+)'\s*=>/g)].map((x) => x[1])
    const allowed = new Set([...publicSpecifiers, ...internalSpecifiers])
    for (const key of found) {
      if (!allowed.has(key)) {
        fail(`Import Map has undeclared specifier '${key}' (add to public or internal in manifest)`)
      }
    }
    for (const key of publicSpecifiers) {
      if (!found.includes(key)) {
        fail(`Manifest public specifier '${key}' not found as Import Map key`)
      }
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

  if (mod.mode === 'exact-named') {
    const expected = new Set(mod.namedExports || [])
    for (const name of expected) {
      if (!parsed.named.has(name)) {
        fail(`${id}: missing named export '${name}' in ${mod.source}`)
      }
    }
    for (const name of parsed.named) {
      if (!expected.has(name)) {
        fail(`${id}: unexpected named export '${name}' in ${mod.source} (update manifest or remove export)`)
      }
    }

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
  }
}

function checkPhp(manifest) {
  const php = manifest.php
  const core = read(php.coreSource)
  if (!core) return

  for (const method of php.publicMethods) {
    if (!new RegExp(`public function ${method}\\s*\\(`).test(core)) {
      fail(`PHP public method missing: ${method}() in ${php.coreSource}`)
    }
  }

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
}

function checkBrowserCssSettings(manifest) {
  const php = read(manifest.importMap.source)
  if (!php) return

  if (!php.includes('window.VueTools')) {
    fail('VueCore.php must inject window.VueTools')
  }
  if (manifest.browser.keys.includes('theme') && !php.includes('theme')) {
    fail(`Browser global key 'theme' not referenced in VueCore.php`)
  }

  const guide = read('DEVELOPER_GUIDE.md') || ''
  const iso = manifest.css.isolationClass
  if (!guide.includes(`.${iso}`) && !guide.includes(`class="${iso}"`)) {
    fail(`DEVELOPER_GUIDE.md must document .${iso}`)
  }
}

function main() {
  const manifest = loadManifest()
  if (!manifest) {
    console.error(errors.join('\n'))
    process.exit(1)
  }

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
