/**
 * Classic-script entry for Compatibility API (#39).
 * Attaches window.VueToolsCompat = { create }.
 */

import { create } from './compat.js'

const root = typeof window !== 'undefined' ? window : globalThis
root.VueToolsCompat = { create }
