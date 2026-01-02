/**
 * useApi composable
 *
 * HTTP client for working with MODX API
 */

/**
 * @typedef {Object} ApiResponse
 * @property {boolean} success
 * @property {string} message
 * @property {Object|Array} data
 * @property {Object} object
 * @property {number} total
 */

/**
 * Create API client for MODX
 *
 * @param {Object} options
 * @param {string} options.baseUrl - Base connector URL
 * @param {string} options.authToken - MODX auth token (MODx.siteId)
 * @returns {Object} API methods
 */
export function useApi(options = {}) {
  const baseUrl = options.baseUrl || window.MODx?.config?.connector_url || '/connectors/'
  const authToken = options.authToken || window.MODx?.siteId || ''

  /**
   * Build URL with parameters
   *
   * @param {string} action - Processor action
   * @param {Object} params - Query parameters
   * @returns {string}
   */
  function buildUrl(action, params = {}) {
    const url = new URL(baseUrl, window.location.origin)
    url.searchParams.set('action', action)

    if (authToken) {
      url.searchParams.set('HTTP_MODAUTH', authToken)
    }

    Object.entries(params).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        url.searchParams.set(key, String(value))
      }
    })

    return url.toString()
  }

  /**
   * Make HTTP request
   *
   * @param {string} action - Processor action
   * @param {Object} params - Request parameters
   * @param {Object} options - Fetch options
   * @returns {Promise<ApiResponse>}
   */
  async function request(action, params = {}, options = {}) {
    const method = options.method || 'GET'
    const isGet = method.toUpperCase() === 'GET'

    const fetchOptions = {
      method,
      headers: {
        'Accept': 'application/json',
        ...options.headers
      },
      credentials: 'same-origin',
      ...options
    }

    let url
    if (isGet) {
      url = buildUrl(action, params)
    } else {
      url = buildUrl(action)

      if (options.json) {
        fetchOptions.headers['Content-Type'] = 'application/json'
        fetchOptions.body = JSON.stringify(params)
      } else {
        const formData = new FormData()
        Object.entries(params).forEach(([key, value]) => {
          if (value !== null && value !== undefined) {
            if (Array.isArray(value)) {
              value.forEach((v, i) => formData.append(`${key}[${i}]`, v))
            } else if (typeof value === 'object' && !(value instanceof File)) {
              formData.append(key, JSON.stringify(value))
            } else {
              formData.append(key, value)
            }
          }
        })
        fetchOptions.body = formData
      }
    }

    const response = await fetch(url, fetchOptions)

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }

    const data = await response.json()

    if (data.success === false) {
      const error = new Error(data.message || 'Request failed')
      error.data = data
      throw error
    }

    return data
  }

  /**
   * GET request
   */
  async function get(action, params = {}) {
    return request(action, params, { method: 'GET' })
  }

  /**
   * POST request
   */
  async function post(action, params = {}, options = {}) {
    return request(action, params, { method: 'POST', ...options })
  }

  /**
   * PUT request
   */
  async function put(action, params = {}, options = {}) {
    return request(action, params, { method: 'PUT', ...options })
  }

  /**
   * DELETE request
   */
  async function del(action, params = {}) {
    return request(action, params, { method: 'DELETE' })
  }

  return {
    request,
    get,
    post,
    put,
    delete: del,
    buildUrl
  }
}

export default useApi
