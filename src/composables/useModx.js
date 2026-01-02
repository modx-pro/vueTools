/**
 * useModx composable
 *
 * Access to MODX objects and configuration
 */

import { computed } from 'vue'

/**
 * Create MODX accessor
 *
 * @returns {Object} MODX methods and properties
 */
export function useModx() {
  /**
   * MODX configuration
   */
  const config = computed(() => window.MODx?.config || {})

  /**
   * Current user info
   */
  const user = computed(() => window.MODx?.user || {})

  /**
   * Site ID (auth token)
   */
  const siteId = computed(() => window.MODx?.siteId || '')

  /**
   * Check if user has permission
   *
   * @param {string} permission - Permission key
   * @returns {boolean}
   */
  function hasPermission(permission) {
    return window.MODx?.perm?.[permission] === true
  }

  /**
   * Get manager URL
   *
   * @param {string} path - Optional path to append
   * @returns {string}
   */
  function getManagerUrl(path = '') {
    const base = window.MODx?.config?.manager_url || '/manager/'
    return path ? `${base}${path}` : base
  }

  /**
   * Get assets URL for component
   *
   * @param {string} component - Component name
   * @returns {string}
   */
  function getAssetsUrl(component) {
    const base = window.MODx?.config?.assets_url || '/assets/'
    return `${base}components/${component}/`
  }

  /**
   * Get connector URL for component
   *
   * @param {string} component - Component name
   * @returns {string}
   */
  function getConnectorUrl(component) {
    return `${getAssetsUrl(component)}connector.php`
  }

  /**
   * Get system setting
   *
   * @param {string} key - Setting key
   * @param {*} defaultValue - Default value
   * @returns {*}
   */
  function getSetting(key, defaultValue = null) {
    return window.MODx?.config?.[key] ?? defaultValue
  }

  /**
   * Get current context key
   *
   * @returns {string}
   */
  function getContextKey() {
    return window.MODx?.config?.context_key || 'web'
  }

  /**
   * Check if running in manager context
   *
   * @returns {boolean}
   */
  function isManager() {
    return window.MODx?.config?.context_key === 'mgr'
  }

  /**
   * Invoke MODX event (if ExtJS MODx object available)
   *
   * @param {string} name - Event name
   * @param {Object} data - Event data
   */
  function fireEvent(name, data = {}) {
    if (typeof window.MODx?.fireEvent === 'function') {
      window.MODx.fireEvent(name, data)
    }
  }

  return {
    config,
    user,
    siteId,
    hasPermission,
    getManagerUrl,
    getAssetsUrl,
    getConnectorUrl,
    getSetting,
    getContextKey,
    isManager,
    fireEvent
  }
}

export default useModx
