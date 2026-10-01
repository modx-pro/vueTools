import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    outDir: 'assets/components/vuetools/composables',
    emptyOutDir: true,
    lib: {
      entry: {
        'useApi': resolve(__dirname, 'src/composables/useApi.js'),
        'useDebug': resolve(__dirname, 'src/composables/useDebug.js'),
        'useLexicon': resolve(__dirname, 'src/composables/useLexicon.js'),
        'useModx': resolve(__dirname, 'src/composables/useModx.js'),
        'usePermission': resolve(__dirname, 'src/composables/usePermission.js'),
        'usePrimeVueLocale': resolve(__dirname, 'src/composables/usePrimeVueLocale.js'),
        'useTheme': resolve(__dirname, 'src/composables/useTheme.js'),
        'index': resolve(__dirname, 'src/composables/index.js'),
      },
      formats: ['es'],
      fileName: (format, entryName) => `${entryName}.min.js`
    },
    rollupOptions: {
      // primelocale намеренно не в external — бандлится в usePrimeVueLocale.min.js (только используемые локали), чтобы не регистрировать отдельный entry в Import Map
      // primevue — external для getActiveTheme (Aura / ModxManagerTheme из Import Map)
      // @vuetools/useDebug — shared debug flag; must not be inlined into useApi.min.js
      external: ['vue', 'pinia', 'primevue', '@vuetools/useDebug'],
      output: {
        globals: {
          vue: 'Vue',
          pinia: 'Pinia',
          primevue: 'PrimeVue'
        }
      }
    },
    minify: 'esbuild',
    sourcemap: false
  }
})
