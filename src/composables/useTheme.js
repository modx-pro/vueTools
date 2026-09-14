/**
 * Central PrimeVue theme resolver for VueTools.
 *
 * Reads `window.VueTools.theme` (injected with the Import Map from the
 * `vuetools.theme` system setting), maps it to a registry entry, falls back
 * to Aura. Extras that never import this stay on their hardcoded theme.
 *
 * @example
 * import { PrimeVue } from 'primevue'
 * import { getActiveTheme } from '@vuetools/useTheme'
 *
 * app.use(PrimeVue, getActiveTheme())
 * // or: app.use(PrimeVue, { ...getActiveTheme(), locale })
 */

import { Aura, ModxManagerTheme } from 'primevue'

const DEFAULT_THEME = 'aura'

/**
 * Registry stores PrimeVue plugin fragments: `{ theme: { preset, options? } }`.
 * `Aura` stays the real Aura preset.
 */
const THEME_REGISTRY = {
  aura: { theme: { preset: Aura } },
  modx: { theme: ModxManagerTheme }
}

/**
 * Resolved registry key (unknown / empty → aura).
 *
 * @param {string} [name]
 * @returns {string}
 */
export function getThemeName(name) {
  const raw =
    name ??
    (typeof window !== 'undefined' ? window.VueTools?.theme : null) ??
    DEFAULT_THEME
  const key = String(raw).trim().toLowerCase()
  return key in THEME_REGISTRY ? key : DEFAULT_THEME
}

/**
 * `{ theme }` for `app.use(PrimeVue, getActiveTheme())`.
 *
 * @param {string} [name]
 * @returns {{ theme: { preset: object, options?: object } }}
 */
export function getActiveTheme(name) {
  return THEME_REGISTRY[getThemeName(name)]
}

/**
 * Same shape as getActiveTheme, for parity with usePrimeVueLocale.
 *
 * @param {Object} [options]
 * @param {string} [options.name]
 * @returns {{ theme: { preset: object, options?: object } }}
 */
export function useTheme(options = {}) {
  return getActiveTheme(options.name)
}

export default getActiveTheme
