VueTools
========

Vue core stack for MODX Revolution 3.x components.

This package provides Vue 3, Pinia, and PrimeVue as ES Modules via Import Map,
allowing MODX components to use modern Vue stack without bundling these
dependencies themselves.

Requirements
------------
- MODX Revolution 3.0.0+
- PHP 8.1+
- Modern browser with ES Modules support

Included Libraries
------------------
- Vue 3.5.13
- Pinia 3.0.1
- PrimeVue 4.3.1 (Aura theme)
- PrimeIcons 7.0.0

Usage
-----
After installation, Vue stack is automatically available on all manager pages.

In your Vue component:

    import { createApp, ref } from 'vue';
    import { createPinia } from 'pinia';
    import PrimeVue from 'primevue';
    import { useApi } from '@vuetools/useApi';
    import { getPrimeVueLocale } from '@vuetools/usePrimeVueLocale';

Pass locale: getPrimeVueLocale() to PrimeVue config for DataTable/DatePicker/Calendar translations (ru/en, from primelocale).

CSS Isolation
-------------
All PrimeVue styles are prefixed with .vueApp class to prevent conflicts
with ExtJS. Make sure your Vue mount points have class="vueApp".

Composables
-----------
- @vuetools/useApi - HTTP client for MODX API
- @vuetools/useLexicon - Lexicon accessor
- @vuetools/useModx - MODX config and user access
- @vuetools/usePermission - Permission checking
- @vuetools/usePrimeVueLocale - PrimeVue locale (ru/en from primelocale) for DataTable, DatePicker, Calendar

Support
-------
GitHub: https://github.com/modx-pro/vuetools
Documentation: https://docs.modx.pro/components/vuetools
