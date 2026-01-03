/**
 * Vue 3 ESM bundle for modxpro-vue-core
 *
 * Re-exports ALL Vue 3 APIs for use via Import Map
 * Including internal render helpers used by compiled templates
с *
 * Uses production build to avoid process.env.NODE_ENV references
 */

// Export everything from Vue production build (named exports)
export * from 'vue/dist/vue.esm-browser.prod.js'

// Also provide a default export for libraries that use `import Vue from 'vue'`
// This is needed for compatibility with some Vue 2-style libraries like vuedraggable
import * as Vue from 'vue/dist/vue.esm-browser.prod.js'
export default Vue
