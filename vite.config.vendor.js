import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import prefixSelector from 'postcss-prefix-selector'

// Get build target from env
const target = process.env.BUILD_TARGET || 'all'

// CSS config with .vueApp prefix isolation
const cssConfig = {
  postcss: {
    plugins: [
      prefixSelector({
        prefix: '.vueApp',
        exclude: [
          /^:root/,
          /^html/,
          /^body/,
          /^@keyframes/,
          /^@font-face/,
          /^@media/,
          /^@supports/,
          /^@import/,
          /^@layer/
        ]
      })
    ]
  }
}

// Config for Vue (no externals - bundle everything)
const vueConfig = {
  plugins: [vue()],
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'),
    '__VUE_OPTIONS_API__': true,
    '__VUE_PROD_DEVTOOLS__': false,
    '__VUE_PROD_HYDRATION_MISMATCH_DETAILS__': false
  },
  build: {
    outDir: 'assets/components/modxprovuecore/vendor',
    emptyOutDir: false,
    lib: {
      entry: resolve(__dirname, 'src/vendor/vue.js'),
      formats: ['es'],
      fileName: () => 'vue.min.js'
    },
    minify: 'esbuild',
    sourcemap: false
  }
}

// Config for Pinia (externalize vue)
const piniaConfig = {
  plugins: [vue()],
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'),
    '__VUE_OPTIONS_API__': true,
    '__VUE_PROD_DEVTOOLS__': false,
    '__VUE_PROD_HYDRATION_MISMATCH_DETAILS__': false
  },
  build: {
    outDir: 'assets/components/modxprovuecore/vendor',
    emptyOutDir: false,
    lib: {
      entry: resolve(__dirname, 'src/vendor/pinia.js'),
      formats: ['es'],
      fileName: () => 'pinia.min.js'
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        paths: {
          'vue': './vue.min.js'
        }
      }
    },
    minify: 'esbuild',
    sourcemap: false
  }
}

// Config for PrimeVue (externalize vue)
const primevueConfig = {
  plugins: [vue()],
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'),
    '__VUE_OPTIONS_API__': true,
    '__VUE_PROD_DEVTOOLS__': false,
    '__VUE_PROD_HYDRATION_MISMATCH_DETAILS__': false
  },
  build: {
    outDir: 'assets/components/modxprovuecore/vendor',
    emptyOutDir: false,
    lib: {
      entry: resolve(__dirname, 'src/vendor/primevue.js'),
      formats: ['es'],
      fileName: () => 'primevue.min.js'
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        paths: {
          'vue': './vue.min.js'
        }
      }
    },
    minify: 'esbuild',
    sourcemap: false
  },
  css: cssConfig
}

// Select config based on target
const configs = {
  vue: vueConfig,
  pinia: piniaConfig,
  primevue: primevueConfig,
  all: vueConfig // Default - will be run 3 times via npm script
}

export default defineConfig(configs[target] || configs.vue)
