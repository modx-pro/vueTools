/**
 * useApi composable
 *
 * HTTP client for working with MODX connector API.
 * Processor properties come from PHP $_GET + $_POST only
 * (modConnectorResponse). JSON bodies and PUT/DELETE bodies do not
 * populate $_POST — those paths put params in the query string (#52).
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
   * Append params to FormData for classic POST ($_POST).
   *
   * @param {Object} params
   * @returns {FormData}
   */
  function toFormData(params) {
    const formData = new FormData()
    Object.entries(params).forEach(([key, value]) => {
      if (value === null || value === undefined) {
        return
      }
      if (Array.isArray(value)) {
        value.forEach((v, i) => formData.append(`${key}[${i}]`, v))
      } else if (typeof value === 'object' && !(value instanceof File)) {
        formData.append(key, JSON.stringify(value))
      } else {
        formData.append(key, value)
      }
    })
    return formData
  }

  /**
   * Make HTTP request
   *
   * @param {string} action - Processor action
   * @param {Object} params - Request parameters
   * @param {Object} options - Fetch options; `json: true` sends JSON body and
   *   also puts params in the query string for MODX processors
   * @returns {Promise<ApiResponse>}
   */
  async function request(action, params = {}, options = {}) {
    const {
      method: methodOption = 'GET',
      json = false,
      headers: extraHeaders = {},
      ...fetchRest
    } = options

    const method = String(methodOption).toUpperCase()
    const isGet = method === 'GET'
    // POST + FormData fills $_POST. Everything else must use $_GET for MODX.
    const paramsInQuery = isGet || json || method !== 'POST'

    const fetchOptions = {
      method,
      headers: {
        Accept: 'application/json',
        ...extraHeaders
      },
      credentials: 'same-origin',
      ...fetchRest
    }

    const url = paramsInQuery ? buildUrl(action, params) : buildUrl(action)

    if (!isGet) {
      if (json) {
        fetchOptions.headers['Content-Type'] = 'application/json'
        fetchOptions.body = JSON.stringify(params)
      } else if (method === 'POST') {
        fetchOptions.body = toFormData(params)
      }
      // PUT/DELETE: params already in query; no body required for MODX
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
   * POST request (FormData → $_POST). Pass `{ json: true }` for JSON body;
   * params then also go in the query string for MODX.
   */
  async function post(action, params = {}, options = {}) {
    return request(action, params, { method: 'POST', ...options })
  }

  /**
   * PUT request — params in query string (MODX $_GET)
   */
  async function put(action, params = {}, options = {}) {
    return request(action, params, { method: 'PUT', ...options })
  }

  /**
   * DELETE request — params in query string (MODX $_GET)
   */
  async function del(action, params = {}, options = {}) {
    return request(action, params, { method: 'DELETE', ...options })
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
