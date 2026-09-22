import { defineConfig } from 'vite'
import { resolve } from 'path'

/**
 * Classic IIFE for window.VueToolsCompat (Compatibility API #39).
 * Must load before ES modules; not an Import Map entry.
 */
export default defineConfig({
  build: {
    outDir: 'assets/components/vuetools/js/mgr',
    emptyOutDir: false,
    lib: {
      entry: resolve(__dirname, 'src/runtime/compat.browser.js'),
      name: 'VueToolsCompat',
      formats: ['iife'],
      fileName: () => 'compat.min.js'
    },
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
        extend: true
      }
    },
    minify: 'esbuild',
    sourcemap: false
  }
})
