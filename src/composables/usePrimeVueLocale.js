/**
 * usePrimeVueLocale composable
 *
 * Возвращает объект локали PrimeVue для текущего языка MODX.
 * Локали берутся из [primelocale](https://github.com/primefaces/primelocale).
 * Решает проблему английского интерфейса в DataTable (фильтры), DatePicker, Calendar и др.
 *
 * @example
 * // При инициализации приложения:
 * import { PrimeVue, Aura } from 'primevue'
 * import { getPrimeVueLocale } from '@vuetools/usePrimeVueLocale'
 *
 * const locale = getPrimeVueLocale() // по умолчанию из MODx.cultureKey
 * app.use(PrimeVue, { theme: { preset: Aura }, locale })
 *
 * @example
 * // Явно указать язык:
 * const locale = getPrimeVueLocale('ru')
 */

import { de } from 'primelocale/js/de.js'
import { en } from 'primelocale/js/en.js'
import { es } from 'primelocale/js/es.js'
import { fr } from 'primelocale/js/fr.js'
import { pl } from 'primelocale/js/pl.js'
import { ru } from 'primelocale/js/ru.js'
import { uk } from 'primelocale/js/uk.js'

const LOCALE_MAP = {
  de,
  en,
  es,
  fr,
  pl,
  ru,
  uk
}

/**
 * Получить объект локали PrimeVue для указанной культуры
 *
 * @param {string} [cultureKey] - Код культуры (ru, en, ...). Если не передан — берётся из window.MODx.cultureKey
 * @returns {Object} Объект локали PrimeVue (для app.use(PrimeVue, { locale }))
 */
export function getPrimeVueLocale(cultureKey) {
  const key =
    cultureKey ??
    (typeof window !== 'undefined' ? (window.MODx?.cultureKey ?? window.MODx?.config?.cultureKey) : null) ??
    'en'
  const normalized = String(key).toLowerCase().split(/[-_]/)[0]
  return LOCALE_MAP[normalized] ?? en
}

/**
 * Composable: возвращает текущую локаль PrimeVue.
 * Не реактивен: при смене языка без перезагрузки страницы передайте новый cultureKey или пересоздайте приложение.
 *
 * @param {Object} [options]
 * @param {string} [options.cultureKey] - Код культуры. Если не передан — из window.MODx.cultureKey (только в браузере)
 * @returns {Object} { locale, getPrimeVueLocale }
 */
export function usePrimeVueLocale(options = {}) {
  const locale = getPrimeVueLocale(options.cultureKey)
  return {
    locale,
    getPrimeVueLocale
  }
}

export default usePrimeVueLocale
