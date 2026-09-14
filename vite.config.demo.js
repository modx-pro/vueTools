/**
 * Dev config for the Modx theme showcase
 *
 * Separate from `vite.config.vendor.js` on purpose: the showcase must never
 * end up in the vendor bundles. Theme sources are imported directly so token
 * edits reload instantly.
 */

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  root: resolve(__dirname, 'src/demo'),
  plugins: [vue()],
  resolve: {
    alias: {
      'vuetools/theme': resolve(__dirname, 'src/theme/modx/index.js')
    }
  },
  server: {
    port: 5273,
    open: false
  },
  build: {
    outDir: resolve(__dirname, 'dist/demo'),
    emptyOutDir: true
  }
})
