/**
 * useLexicon composable
 *
 * Working with MODX lexicons
 */

/**
 * Create lexicon accessor
 *
 * @param {Object} options
 * @param {Object} options.lexicon - Custom lexicon object
 * @returns {Object} Lexicon methods
 */
export function useLexicon(options = {}) {
  /**
   * Get lexicon entry
   *
   * @param {string} key - Lexicon key
   * @param {Object} params - Replacement parameters
   * @returns {string}
   */
  function _(key, params = {}) {
    // Try custom lexicon first
    let value = options.lexicon?.[key]

    // Then try global MODX lexicon
    if (value === undefined) {
      value = window.MODx?.lang?.[key]
    }

    // Fallback to key itself
    if (value === undefined) {
      return key
    }

    // Replace parameters
    if (Object.keys(params).length > 0) {
      Object.entries(params).forEach(([paramKey, paramValue]) => {
        value = value.replace(new RegExp(`\\[\\[\\+${paramKey}\\]\\]`, 'g'), paramValue)
        value = value.replace(new RegExp(`\\{${paramKey}\\}`, 'g'), paramValue)
        value = value.replace(new RegExp(`:${paramKey}`, 'g'), paramValue)
      })
    }

    return value
  }

  /**
   * Check if lexicon key exists
   *
   * @param {string} key - Lexicon key
   * @returns {boolean}
   */
  function has(key) {
    return options.lexicon?.[key] !== undefined || window.MODx?.lang?.[key] !== undefined
  }

  /**
   * Get all lexicon entries matching prefix
   *
   * @param {string} prefix - Key prefix
   * @returns {Object}
   */
  function getByPrefix(prefix) {
    const result = {}
    const lexicon = { ...window.MODx?.lang, ...options.lexicon }

    Object.entries(lexicon).forEach(([key, value]) => {
      if (key.startsWith(prefix)) {
        result[key] = value
      }
    })

    return result
  }

  /**
   * Load lexicon topics dynamically
   *
   * @param {string|string[]} topics - Topics to load
   * @returns {Promise<void>}
   */
  async function load(topics) {
    const topicList = Array.isArray(topics) ? topics : [topics]

    // This would need to call MODX lexicon loader
    // For now just log warning
    console.warn('[useLexicon] Dynamic topic loading not implemented:', topicList)
  }

  return {
    _,
    has,
    getByPrefix,
    load
  }
}

export default useLexicon
