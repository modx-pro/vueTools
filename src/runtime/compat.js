/**
 * VueTools Compatibility API helpers (#39)
 *
 * Loaded as a classic IIFE before ES modules so extras can call
 * window.VueTools.hasFeature / checkCompatibility synchronously.
 */

/**
 * Strip MODX release suffixes (-pl, -dev, …) and parse major.minor.patch.
 *
 * @param {unknown} value
 * @returns {[number, number, number]}
 */
export function normalizeVersion(value) {
  const raw = String(value ?? '')
    .trim()
    .replace(/^v/i, '')
    .split('-')[0]
    .split('+')[0]
  const parts = raw.split('.').map((part) => {
    const n = Number.parseInt(part, 10)
    return Number.isFinite(n) ? n : 0
  })
  return [parts[0] || 0, parts[1] || 0, parts[2] || 0]
}

/**
 * @param {unknown} a
 * @param {unknown} b
 * @returns {number} negative if a < b, 0 if equal, positive if a > b
 */
export function compareVersions(a, b) {
  const left = normalizeVersion(a)
  const right = normalizeVersion(b)
  for (let i = 0; i < 3; i += 1) {
    if (left[i] !== right[i]) {
      return left[i] - right[i]
    }
  }
  return 0
}

/**
 * @param {{ version: string, features?: Record<string, boolean> }} options
 * @returns {{ version: string, hasFeature: (name: string) => boolean, checkCompatibility: (opts?: { minVersion?: string }) => true }}
 */
export function createCompatApi(options) {
  const version = String(options?.version ?? '')
  const catalog =
    options?.features && typeof options.features === 'object' && !Array.isArray(options.features)
      ? options.features
      : {}

  const hasFeature = (name) => {
    if (typeof name !== 'string' || name === '') {
      return false
    }
    return Object.prototype.hasOwnProperty.call(catalog, name) && !!catalog[name]
  }

  const checkCompatibility = (opts = {}) => {
    const minVersion = opts?.minVersion
    if (minVersion == null || minVersion === '') {
      throw new Error(
        '[VueTools] checkCompatibility requires { minVersion }. Installed version: ' + version
      )
    }
    if (compareVersions(version, minVersion) < 0) {
      throw new Error(
        '[VueTools] Incompatible version: installed ' +
          version +
          ', required >= ' +
          minVersion
      )
    }
    return true
  }

  return {
    version,
    hasFeature,
    checkCompatibility
  }
}

export function create(options) {
  return createCompatApi(options)
}
