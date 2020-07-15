import defaultAxios from 'axios'
import qs from 'qs'
import cookie from 'js-cookie'
import { decorate, observable } from 'mobx'

const UNAUTHENTICATED = '401'
const FORBIDDEN = '403'
const NOT_FOUND = '404'

class ApiClient {
  accessToken

  errors = {
    UNAUTHENTICATED: { type: UNAUTHENTICATED },
    FORBIDDEN: { type: FORBIDDEN },
    NOT_FOUND: { type: NOT_FOUND },
  }

  constructor({ apiToken, apiUrl, headers = {} }) {
    this.axios = defaultAxios
    this.apiToken = apiToken
    this.accessToken = this.accessToken || cookie.get('accessToken') || null
    this.headers = headers
    this.settings = {
      paramsSerializer: (params) =>
        qs.stringify(params, { arrayFormat: 'brackets' }),
      baseURL: apiUrl,
    }
  }

  setCredentials({ accessToken }) {
    this.accessToken = accessToken
    if (accessToken) {
      cookie.set('accessToken', accessToken, {
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        expires: 365,
      })
    } else {
      cookie.remove('accessToken', { path: '/' })
    }
  }

  resetCredentials() {
    return this.setCredentials({ accessToken: null })
  }

  clearSession() {
    this.resetCredentials()
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
    headers['Accept'] = 'application/json'
    headers['Content-Type'] = 'application/json'
    if (this.accessToken) headers['Access-Token'] = this.accessToken

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

decorate(ApiClient, {
  accessToken: observable,
})

export default ApiClient
