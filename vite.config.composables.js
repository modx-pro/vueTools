import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    outDir: 'assets/components/vuetools/composables',
    emptyOutDir: true,
    lib: {
      entry: {
        'useApi': resolve(__dirname, 'src/composables/useApi.js'),
        'useLexicon': resolve(__dirname, 'src/composables/useLexicon.js'),
        'useModx': resolve(__dirname, 'src/composables/useModx.js'),
        'usePermission': resolve(__dirname, 'src/composables/usePermission.js'),
        'index': resolve(__dirname, 'src/composables/index.js'),
      },
      formats: ['es'],
      fileName: (format, entryName) => `${entryName}.min.js`
    },
    rollupOptions: {
      external: ['vue', 'pinia'],
      output: {
        globals: {
          vue: 'Vue',
          pinia: 'Pinia'
        }
      }
    },
    minify: 'esbuild',
    sourcemap: false
  }
})
