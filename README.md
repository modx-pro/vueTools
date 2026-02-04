# modxpro-vue-core

Vue core stack for MODX Revolution 3.x components.

## Overview

This package provides a shared Vue stack (Vue 3, Pinia, PrimeVue) for MODX Extras via ES Modules Import Map. Instead of each Extra bundling its own copy of Vue libraries, they can use this shared core.

## Features

- **Vue 3.5.x** - Reactive framework
- **Pinia 3.x** - State management
- **PrimeVue 4.x** - UI components (Aura theme)
- **PrimeIcons 7.x** - Icon library
- **Common composables** - useApi, useLexicon, useModx, usePermission, usePrimeVueLocale (ru/en for DataTable, DatePicker, Calendar)

## Requirements

- PHP >= 8.1
- MODX Revolution >= 3.0
- Modern browser (Chrome 89+, Firefox 108+, Safari 16.4+, Edge 89+)

## Installation

```bash
# Install via MODX package manager
# or build from source
```

## Development

```bash
# Install dependencies
npm install

# Build vendor bundles
npm run build:vendor

# Build composables
npm run build:composables

# Build all
npm run build:all
```

## Usage in Extras

### 1. Declare dependency

```php
// _build/build.transport.php
$package->setAttribute('requires', [
    'modxpro-vue-core' => '>=1.0.0'
]);
```

### 2. Configure Vite

```js
// vite.config.js
export default defineConfig({
  build: {
    rollupOptions: {
      external: [
        'vue',
        'pinia',
        'primevue',
        '@vuetools/useApi',
        '@vuetools/useLexicon',
        '@vuetools/useModx',
        '@vuetools/usePermission',
        '@vuetools/usePrimeVueLocale'
      ]
    }
  }
})
```

### 3. Import in code

```js
import { createApp, ref } from 'vue';
import { createPinia } from 'pinia';
import { PrimeVue, Aura, DataTable, Button } from 'primevue';
import { useApi, useLexicon } from '@modxpro-vue-core/';
import { getPrimeVueLocale } from '@vuetools/usePrimeVueLocale';

const app = createApp(MyComponent);
app.use(createPinia());
app.use(PrimeVue, { theme: { preset: Aura }, locale: getPrimeVueLocale() });
app.mount('#my-app');
```

## Version

1.1.0-beta1

## License

MIT
