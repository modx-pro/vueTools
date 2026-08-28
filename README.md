# modxpro-vue-core

Vue core stack for MODX Revolution 3.x components.

## Overview

Shared Vue 3, Pinia, and PrimeVue for MODX Extras through an ES Modules Import Map. Extras import these libraries instead of shipping their own copies.

## Features

- Vue 3.5.x
- Pinia 3.x
- PrimeVue 4.x with the `Modx` manager theme and `Aura`
- PrimeIcons 7.x
- Composables: useApi, useLexicon, useModx, usePermission, usePrimeVueLocale (`de`, `en`, `es`, `fr`, `pl`, `ru`, `uk`)

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

# Build everything (gate)
npm run build:all

# Theme showcase
npm run demo
```

## Modx theme

`Modx` is a PrimeVue 4 preset that follows the MODX Revolution 3 manager: Nora base, splash `#234368`, 3px radius, 13px body. Use it in the manager instead of Aura.

```js
import { PrimeVue, Modx, ModxManagerTheme, Button } from 'primevue'
// or: import { Modx, ModxManagerTheme } from 'vuetools/theme'

app.use(PrimeVue, {
  theme: ModxManagerTheme, // preset: Modx, darkModeSelector: 'none'
  locale: getPrimeVueLocale()
})

// Save in the manager is green:
// <Button label="Save" severity="success" />
// Toolbar buttons:
// <Button label="Cancel" severity="secondary" />
```

For standalone apps and the showcase, use `ModxTheme` and add class `p-dark` on an ancestor to switch dark mode. See [DEVELOPER_GUIDE.md](DEVELOPER_GUIDE.md#modx-theme-primevue-4).

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
import { PrimeVue, ModxManagerTheme, DataTable, Button } from 'primevue';
import { useApi, useLexicon } from '@modxpro-vue-core/';
import { getPrimeVueLocale } from '@vuetools/usePrimeVueLocale';

const app = createApp(MyComponent);
app.use(createPinia());
app.use(PrimeVue, { theme: ModxManagerTheme, locale: getPrimeVueLocale() });
app.mount('#my-app');
```

`Aura` is still exported for extras that already use it. If you import from `primevue`, you do not need to change `external`: `Modx` ships in the same `primevue.min.js` bundle. Optional Import Map aliases: `vuetools`, `vuetools/theme`.

## Version

1.1.3-pl

## License

MIT
