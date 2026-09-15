VueTools
========

Vue core stack for MODX Revolution 3.x components.

This package provides Vue 3, Pinia, and PrimeVue as ES Modules via Import Map,
allowing MODX components to use modern Vue stack without bundling these
dependencies themselves.

Public API: docs/PUBLIC_API.md and DEVELOPER_GUIDE.md in the repository.

Requirements
------------
- MODX Revolution 3.0.0+
- PHP 8.1+
- Modern browser with ES Modules support

Included Libraries
------------------
- Vue 3.5.32
- Pinia 3.0.4
- PrimeVue 4.5.5 (Aura + Modx manager theme)
- PrimeIcons 7.0.0

Usage
-----
After installation, Vue stack is automatically available on all manager pages.

In your Vue component:

    import { createApp, ref } from 'vue';
    import { createPinia } from 'pinia';
    import { PrimeVue } from 'primevue';
    import { useApi } from '@vuetools/useApi';
    import { getPrimeVueLocale } from '@vuetools/usePrimeVueLocale';
    import { getActiveTheme } from '@vuetools/useTheme';

    app.use(PrimeVue, { ...getActiveTheme(), locale: getPrimeVueLocale() });

Package require name: vuetools (e.g. 'vuetools' => '>=1.2.0').

CSS Isolation
-------------
All PrimeVue styles are prefixed with .vueApp class to prevent conflicts
with ExtJS. Make sure your Vue mount points have class="vueApp".

Composables
-----------
- @vuetools/useApi - HTTP client for MODX API
- @vuetools/useLexicon - Lexicon accessor
- @vuetools/useModx - MODX config and user access
- @vuetools/usePermission - Permission checking (can / canAny / canAll)
- @vuetools/usePrimeVueLocale - PrimeVue locale (de, en, es, fr, pl, ru, uk)
- @vuetools/useTheme - getActiveTheme() from vuetools.theme setting

Support
-------
GitHub: https://github.com/modx-pro/vuetools
Documentation: https://docs.modx.pro/components/vuetools
