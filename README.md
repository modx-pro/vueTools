# modxpro-vue-core

Vue core stack for MODX Revolution 3.x components.

## Overview

Shared Vue 3, Pinia, and PrimeVue for MODX Extras through an ES Modules Import Map. Extras import these libraries instead of shipping their own copies.

## Features

- Vue 3.5.x
- Pinia 3.x
- PrimeVue 4.x with `Aura` and the `Modx` manager theme
- Central theme switch: system setting `vuetools.theme` + `getActiveTheme()` from `@vuetools/useTheme`
- PrimeIcons 7.x
- Composables: useApi, useLexicon, useModx, usePermission, usePrimeVueLocale, getActiveTheme

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

## Theme (central)

Admin setting `vuetools.theme` (`aura` default, or `modx`). VueCoreManager injects `window.VueTools = { theme }`. Migrated extras resolve it once:

```js
import { PrimeVue } from 'primevue'
import { getActiveTheme } from '@vuetools/useTheme'
import { getPrimeVueLocale } from '@vuetools/usePrimeVueLocale'

app.use(PrimeVue, {
  ...getActiveTheme(),
  locale: getPrimeVueLocale()
})
```

Flip the setting → no consumer rebuild. Extras that still hardcode `Aura` or `ModxManagerTheme` keep working unchanged.

`Modx` (Nora base, splash `#234368`, 3px radius, 13px body) is selected when `vuetools.theme = modx`. Save buttons use `severity="success"`; toolbar chrome uses `severity="secondary"`. Showcase / dark opt-in: `ModxTheme` + class `p-dark`. Details: [DEVELOPER_GUIDE.md](DEVELOPER_GUIDE.md).

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
        '@vuetools/usePrimeVueLocale',
        '@vuetools/useTheme'
      ]
    }
  }
})
```

### 3. Import in code

```js
import { createApp, ref } from 'vue';
import { createPinia } from 'pinia';
import { PrimeVue, DataTable, Button } from 'primevue';
import { useApi, useLexicon } from '@modxpro-vue-core/';
import { getPrimeVueLocale } from '@vuetools/usePrimeVueLocale';
import { getActiveTheme } from '@vuetools/useTheme';

const app = createApp(MyComponent);
app.use(createPinia());
app.use(PrimeVue, { ...getActiveTheme(), locale: getPrimeVueLocale() });
app.mount('#my-app');
```

`Aura` and `ModxManagerTheme` remain exported for gradual migration. Optional Import Map aliases: `vuetools`, `vuetools/theme`.

**Do not** import `primevue/button`, `primevue/config`, etc. With `external: ['primevue']` those subpaths are bundled from `node_modules` and create a second `@primeuix` Theme. Use named imports from `primevue` only.

## Version

1.1.3-pl

## License

MIT
