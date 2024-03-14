import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'

import { isServerApiError } from './Errors'
import { Config } from '../Config'

export interface RequestConfig<Data> extends AxiosRequestConfig {
  parseData: (data: object) => Data
}

class ServerApiAuthStore {
  private _authToken: string | null = null

  get authToken(): string {
    return this._authToken ||= localStorage.getItem('authToken') as string
  }

  set authToken(newToken: string | null) {
    if (newToken === null) {
      localStorage.removeItem('authToken')
    } else {
      localStorage.setItem('authToken', newToken)
    }

    this._authToken = newToken
  }
}

export const serverApiAuthStore = new ServerApiAuthStore()

export abstract class ServerClient {
  private readonly axios: AxiosInstance

  constructor() {
    this.axios = axios.create({ baseURL: Config.SERVER_URL })
  }

  protected async request<Data>(path: string, config: RequestConfig<Data>): Promise<Data> {
    const authToken = serverApiAuthStore.authToken

    try {
      let { headers } = config

      if (authToken) {
        headers = {
          ...headers,
          'Authorization': `Bearer ${authToken}`,
        }
      }

      const res = await this.axios.request<object>({
        ...config,
        url: path,
        headers: headers,
      })

      return config.parseData(res.data)
    } catch (error) {
      if (isServerApiError(error) && error.response.data.error === 'Invalid token') {
        serverApiAuthStore.authToken = null
      }

      throw error
    }
  }

  protected async get<Data>(path: string, config: RequestConfig<Data>): Promise<Data> {
    return this.request<Data>(path, { method: 'GET', ...config })
  }

  protected async post<Data>(path: string, config: RequestConfig<Data>): Promise<Data> {
    return this.request<Data>(path, { method: 'POST', ...config })
  }

  protected async put<Data>(path: string, config: RequestConfig<Data>): Promise<Data> {
    return this.request<Data>(path, { method: 'PUT', ...config })
  }

  protected async patch<Data>(path: string, config: RequestConfig<Data>): Promise<Data> {
    return this.request<Data>(path, { method: 'PATCH', ...config })
  }

  protected async delete<Data>(path: string, config: RequestConfig<Data>): Promise<Data> {
    return this.request<Data>(path, { method: 'DELETE', ...config })
  }
}
