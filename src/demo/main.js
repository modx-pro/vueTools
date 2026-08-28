/**
 * Showcase entry
 *
 * Uses `ModxTheme`, so dark mode is driven by the `p-dark` class on the
 * document root. Inside the MODX manager `ModxManagerTheme` is the right
 * choice instead.
 */

import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import ConfirmationService from 'primevue/confirmationservice'
import ToastService from 'primevue/toastservice'
import Tooltip from 'primevue/tooltip'
import { ModxTheme } from 'vuetools/theme'

import App from './App.vue'
import './demo.css'
import 'primeicons/primeicons.css'

const app = createApp(App)

app.use(PrimeVue, { theme: ModxTheme, ripple: false })
app.use(ConfirmationService)
app.use(ToastService)
app.directive('tooltip', Tooltip)

app.mount('#app')
