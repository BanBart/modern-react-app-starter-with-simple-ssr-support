import defaultAxios from 'axios'
import qs from 'qs'

const NOT_FOUND = '404'
const FORBIDDEN = '403'

class ApiClient {
  errors = {
    NOT_FOUND: { type: NOT_FOUND },
  }

  constructor({ apiToken, apiUrl, headers = {} }) {
    this.axios = defaultAxios
    this.apiToken = apiToken
    this.headers = headers
    this.settings = {
      paramsSerializer: (params) =>
        qs.stringify(params, { arrayFormat: 'brackets' }),
      baseURL: apiUrl,
    }
  }

  async requestManager(
    request,
    { onSuccessCallback, onNotFoundCallback, onForbiddenCallback }
  ) {
    try {
      const response = await request()
      onSuccessCallback && onSuccessCallback(response)
      return response
    } catch (e) {
      if (e.type === NOT_FOUND && onNotFoundCallback) {
        onNotFoundCallback()
      } else if (e.type === FORBIDDEN && onForbiddenCallback) {
        onForbiddenCallback()
      } else {
        throw e
      }
    }
  }

  async get(endpoint, params = {}, opts = {}) {
    return await this.send(
      Object.assign({ method: 'get', endpoint: endpoint, params: params }, opts)
    )
  }

  async post(endpoint, payload = {}, opts = {}) {
    return await this.send(
      Object.assign(
        { method: 'post', endpoint: endpoint, payload: payload },
        opts
      )
    )
  }

  async put(endpoint, payload = {}, opts = {}) {
    return await this.send(
      Object.assign(
        { method: 'put', endpoint: endpoint, payload: payload },
        opts
      )
    )
  }

  async patch(endpoint, payload = {}, opts = {}) {
    return await this.send(
      Object.assign(
        { method: 'patch', endpoint: endpoint, payload: payload },
        opts
      )
    )
  }
  async delete(endpoint, payload = {}, opts = {}) {
    return await this.send(
      Object.assign(
        { method: 'delete', endpoint: endpoint, payload: payload },
        opts
      )
    )
  }

  async send(request) {
    const {
      method = 'get',
      endpoint,
      payload = {},
      headers = {},
      responseType = 'json',
      params,
    } = request

    Object.assign(headers, this.headers)

    headers['Authorization'] = `Bearer ${this.apiToken}`

    try {
      const response = await this.axios({
        method,
        headers,
        params,
        responseType,
        url: endpoint,
        data: payload,
        ...this.settings,
      })

      return response.data
    } catch (error) {
      if (error.response && error.response.status === 404) {
        throw this.errors.NOT_FOUND
      } else if (error.response && error.response.status === 403) {
        throw this.errors.FORBIDDEN
      } else {
        throw error
      }
    }
  }
}

export default ApiClient
