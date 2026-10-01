/**
 * useDebug composable
 *
 * Lightweight debug tooling for Extra authors. Off by default; no console
 * output until VueTools.debug.enable() or enable() is called.
 */

const PREFIX = '[VueTools]'

/** Keys (and URL query params) never written to the console. */
const SENSITIVE_KEY =
  /pass(word)?|passwd|token|auth|secret|site[_-]?id|http_modauth|authorization|cookie|csrf|api[_-]?key|session/i

/** Expected Import Map keys for a healthy VueTools install. */
const EXPECTED_IMPORTS = ['vue', 'pinia', 'primevue', 'vuetools/theme']

let enabled = false

/** @type {Map<string, number>} */
const timers = new Map()

/**
 * @returns {number}
 */
function nowMs() {
  return typeof performance !== 'undefined' ? performance.now() : Date.now()
}

/**
 * @returns {boolean}
 */
export function isDebugEnabled() {
  return enabled
}

/**
 * Redact sensitive fields in plain objects / arrays. Primitives pass through.
 * Does not mutate the input.
 *
 * @param {*} value
 * @returns {*}
 */
export function redact(value) {
  if (value == null || typeof value !== 'object') {
    return value
  }

  if (value instanceof Error) {
    return { name: value.name, message: value.message }
  }

  if (Array.isArray(value)) {
    return value.map((item) => redact(item))
  }

  const out = {}
  for (const [key, val] of Object.entries(value)) {
    if (SENSITIVE_KEY.test(key)) {
      out[key] = '[redacted]'
    } else if (val != null && typeof val === 'object') {
      out[key] = redact(val)
    } else {
      out[key] = val
    }
  }
  return out
}

/**
 * Redact sensitive query params in a URL string.
 *
 * @param {string} urlString
 * @returns {string}
 */
export function redactUrl(urlString) {
  try {
    const url = new URL(urlString, typeof window !== 'undefined' ? window.location.origin : 'http://localhost')
    for (const key of [...url.searchParams.keys()]) {
      if (SENSITIVE_KEY.test(key)) {
        url.searchParams.set(key, '[redacted]')
      }
    }
    return url.toString()
  } catch {
    return String(urlString)
  }
}

/**
 * @param {*} arg
 * @returns {*}
 */
function sanitizeArg(arg) {
  if (typeof arg === 'string' && (arg.startsWith('http://') || arg.startsWith('https://') || arg.includes('?'))) {
    return redactUrl(arg)
  }
  return redact(arg)
}

/**
 * @param {Function} method
 * @param {any[]} args
 */
function write(method, args) {
  if (!enabled) {
    return
  }
  method(PREFIX, ...args.map(sanitizeArg))
}

/**
 * Read Import Map presence and keys. Never throws.
 *
 * @returns {{ present: boolean, keys: string[], error?: string }}
 */
export function getImportMapStatus() {
  if (typeof document === 'undefined') {
    return { present: false, keys: [], error: 'no document' }
  }

  const el = document.querySelector('script[type="importmap"]')
  if (!el) {
    return { present: false, keys: [] }
  }

  try {
    const map = JSON.parse(el.textContent || '{}')
    return {
      present: true,
      keys: Object.keys(map.imports || {}),
    }
  } catch (err) {
    return {
      present: false,
      keys: [],
      error: err instanceof Error ? err.message : 'invalid import map JSON',
    }
  }
}

/**
 * Versions from window.VueTools (injected by PHP) plus live module probes.
 *
 * @returns {Promise<{ package: string, vue: string, pinia: string, primevue: string }>}
 */
/**
 * @param {string} moduleId
 * @param {string} field
 * @param {Record<string, string>} result
 * @param {{ useExportVersion?: boolean }} [opts]
 */
async function probeModuleVersion(moduleId, field, result, opts = {}) {
  const useExportVersion = opts.useExportVersion !== false
  try {
    const mod = await import(moduleId)
    if (useExportVersion && mod?.version) {
      result[field] = mod.version
    }
  } catch {
    if (result[field] === 'unknown') {
      result[field] = 'unavailable'
    }
  }
}

async function resolveVersions() {
  const injected = (typeof window !== 'undefined' && window.VueTools) || {}
  const versions = injected.versions || {}

  const result = {
    package: injected.version || versions.package || 'unknown',
    vue: versions.vue || 'unknown',
    pinia: versions.pinia || 'unknown',
    primevue: versions.primevue || 'unknown',
  }

  await probeModuleVersion('vue', 'vue', result)
  await probeModuleVersion('pinia', 'pinia', result)
  // PrimeVue barrel may not export version; keep PHP-injected value
  await probeModuleVersion('primevue', 'primevue', result, { useExportVersion: false })

  return result
}

/**
 * Compatibility notes for Extra authors (missing Import Map keys, etc.).
 *
 * @param {{ present: boolean, keys: string[], error?: string }} importMap
 * @returns {string[]}
 */
function compatibilityNotes(importMap) {
  const notes = []

  if (!importMap.present) {
    notes.push('Import Map missing or unreadable — VueTools may not be installed')
    if (importMap.error) {
      notes.push(`Import Map parse error: ${importMap.error}`)
    }
    return notes
  }

  for (const key of EXPECTED_IMPORTS) {
    if (!importMap.keys.includes(key)) {
      notes.push(`Import Map missing key: ${key}`)
    }
  }

  if (notes.length === 0) {
    notes.push('Import Map looks healthy')
  }

  return notes
}

/**
 * One-shot environment dump when debug is turned on.
 *
 * @returns {Promise<void>}
 */
async function dumpEnvironment() {
  write(console.log, ['debug enabled'])

  const versions = await resolveVersions()
  write(console.log, ['VueTools', versions.package])
  write(console.log, ['Vue', versions.vue])
  write(console.log, ['Pinia', versions.pinia])
  write(console.log, ['PrimeVue', versions.primevue])

  const importMap = getImportMapStatus()
  write(console.log, [
    'Import Map',
    {
      present: importMap.present,
      keys: importMap.keys,
      ...(importMap.error ? { error: importMap.error } : {}),
    },
  ])

  for (const note of compatibilityNotes(importMap)) {
    write(console.log, ['Compatibility', note])
  }
}

/**
 * Enable debug mode. Idempotent. Prints environment snapshot once per enable.
 *
 * @returns {Promise<void>}
 */
export function enable() {
  if (enabled) {
    return Promise.resolve()
  }
  enabled = true
  return dumpEnvironment().catch(() => {
    write(console.warn, ['Failed to collect environment snapshot'])
  })
}

/**
 * Disable debug mode. Idempotent. Clears open timers.
 */
export function disable() {
  enabled = false
  timers.clear()
}

/**
 * Log an API request when debug is on. Used by useApi.
 *
 * @param {Object} info
 * @param {string} info.method
 * @param {string} info.action
 * @param {string} [info.url]
 * @param {number} [info.durationMs]
 * @param {boolean} [info.ok]
 * @param {string} [info.error]
 */
export function logRequest(info) {
  if (!enabled) {
    return
  }

  const payload = {
    method: info.method,
    action: info.action,
    ...(info.url ? { url: redactUrl(info.url) } : {}),
    ...(info.durationMs != null ? { durationMs: Math.round(info.durationMs * 10) / 10 } : {}),
    ...(info.ok != null ? { ok: info.ok } : {}),
    ...(info.error ? { error: info.error } : {}),
  }

  const log = info.ok === false ? console.warn : console.log
  write(log, ['API', payload])
}

/**
 * Attach enable/disable on window.VueTools.debug for console use.
 */
export function installDebugApi() {
  if (typeof window === 'undefined') {
    return
  }

  const root = window.VueTools || (window.VueTools = {})
  root.debug = {
    enable,
    disable,
    isEnabled: isDebugEnabled,
  }
}

/**
 * Composable: log / warn / error / time. No-ops when debug is off.
 *
 * @returns {{ log: Function, warn: Function, error: Function, time: Function, isEnabled: Function }}
 */
export function useDebug() {
  function log(...args) {
    write(console.log, args)
  }

  function warn(...args) {
    write(console.warn, args)
  }

  function error(...args) {
    write(console.error, args)
  }

  /**
   * Start a timer. Returns end() that logs duration when debug is on.
   * Safe to call when disabled (end is a no-op).
   *
   * @param {string} label
   * @returns {() => void}
   */
  function time(label) {
    if (!enabled) {
      return () => {}
    }

    const key = String(label)
    timers.set(key, nowMs())

    return () => {
      if (!enabled) {
        timers.delete(key)
        return
      }
      const started = timers.get(key)
      timers.delete(key)
      if (started == null) {
        return
      }
      const ms = Math.round((nowMs() - started) * 10) / 10
      write(console.log, [`${key}: ${ms}ms`])
    }
  }

  return {
    log,
    warn,
    error,
    time,
    isEnabled: isDebugEnabled,
  }
}

installDebugApi()

export default useDebug
