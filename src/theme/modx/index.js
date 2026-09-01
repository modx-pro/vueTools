/**
 * Modx theme for PrimeVue 4
 *
 * A native MODX Revolution 3 manager look, expressed as a PrimeVue preset.
 *
 *   import { PrimeVue } from 'primevue'
 *   import { Modx, ModxManagerTheme } from 'vuetools/theme'
 *
 *   app.use(PrimeVue, { theme: ModxManagerTheme })
 *
 * Light and dark live in the same preset as semantic color schemes. There is no
 * separate light or dark preset: which one applies is decided by
 * `theme.options.darkModeSelector`.
 */

import { Modx } from './preset.js'

export { Modx }
export { primitive } from './primitive.js'
export { semantic } from './semantic.js'
export { dark } from './dark.js'
export { components } from './components.js'

/**
 * Theme options for the MODX manager
 *
 * The manager itself has no dark mode, and ExtJS chrome stays light. Following
 * the PrimeVue default of `system` would darken only the Vue widgets on a dark
 * OS, so the selector is switched off.
 */
export const ModxManagerTheme = {
  preset: Modx,
  options: {
    darkModeSelector: 'none',
    cssLayer: false
  }
}

/**
 * Theme options for standalone apps and the showcase
 *
 * Dark mode is opt-in per subtree: add the `p-dark` class on any ancestor.
 */
export const ModxTheme = {
  preset: Modx,
  options: {
    darkModeSelector: '.p-dark',
    cssLayer: false
  }
}

export default Modx
