/**
 * usePermission composable
 *
 * Check user permissions in MODX manager
 */

/**
 * Create permission checker
 *
 * @returns {Object} Permission methods
 */
export function usePermission() {
  /**
   * Get all user permissions
   *
   * @returns {Object}
   */
  function getAll() {
    return window.MODx?.perm || {}
  }

  /**
   * Check if user has single permission
   *
   * @param {string} permission - Permission key
   * @returns {boolean}
   */
  function can(permission) {
    return window.MODx?.perm?.[permission] === true
  }

  /**
   * Check if user has any of the permissions
   *
   * @param {string[]} permissions - Permission keys
   * @returns {boolean}
   */
  function canAny(permissions) {
    if (!Array.isArray(permissions)) {
      return can(permissions)
    }
    return permissions.some(p => can(p))
  }

  /**
   * Check if user has all permissions
   *
   * @param {string[]} permissions - Permission keys
   * @returns {boolean}
   */
  function canAll(permissions) {
    if (!Array.isArray(permissions)) {
      return can(permissions)
    }
    return permissions.every(p => can(p))
  }

  /**
   * Check common MODX permissions
   */
  const permissions = {
    // Resources
    canCreateResource: () => can('new_document'),
    canEditResource: () => can('edit_document'),
    canDeleteResource: () => can('delete_document'),
    canPublishResource: () => can('publish_document'),
    canUnpublishResource: () => can('unpublish_document'),

    // Users
    canViewUsers: () => can('view_user'),
    canEditUsers: () => can('edit_user'),
    canDeleteUsers: () => can('delete_user'),

    // Elements
    canViewElements: () => can('view_element'),
    canEditElements: () => can('edit_element'),
    canDeleteElements: () => can('delete_element'),

    // System
    canViewSystemSettings: () => can('settings'),
    canFlushSessions: () => can('flush_sessions'),
    canClearCache: () => can('empty_cache'),

    // Files
    canViewFiles: () => can('file_view'),
    canUploadFiles: () => can('file_upload'),
    canDeleteFiles: () => can('file_remove'),

    // Packages
    canInstallPackages: () => can('packages'),
  }

  return {
    can,
    canAny,
    canAll,
    getAll,
    ...permissions
  }
}

export default usePermission
