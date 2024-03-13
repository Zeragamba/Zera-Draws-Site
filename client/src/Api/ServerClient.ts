import axios, { AxiosRequestConfig, Method } from 'axios'

import { isServerApiError } from './Errors'
import { Config } from '../Config'

export abstract class ServerClient {
  static axios = axios.create({ baseURL: Config.SERVER_URL })

  static _authToken: string | null

  public static set authToken(newToken: string | null) {
    if (newToken === null) {
      localStorage.removeItem('authToken')
    } else {
      localStorage.setItem('authToken', newToken)
    }

    this._authToken = newToken
  }

  public static get authToken(): string {
    return this._authToken ||= localStorage.getItem('authToken') as string
  }

  private static async request(method: Method, path: string, config: AxiosRequestConfig = {}): Promise<unknown> {
    try {
      let { headers } = config

      if (this.authToken) {
        headers = {
          ...headers,
          'Authorization': `Bearer ${this.authToken}`,
        }
      }

      const res = await this.axios.request<unknown>({
        ...config,
        headers: headers,
        method: method,
        url: path,
      })

      return res.data
    } catch (error) {
      if (isServerApiError(error) && error.response.data.error === 'Invalid token') {
        this.authToken = null
      }

      throw error
    }
  }

  protected static async get(path: string, config: AxiosRequestConfig = {}): Promise<unknown> {
    return this.request('GET', path, config)
  }

  protected static async post<Data = {}>(path: string, data?: Data, config: AxiosRequestConfig = {}): Promise<unknown> {
    return this.request('POST', path, { data, ...config })
  }

  protected static async put<Data = {}>(path: string, data?: Data, config: AxiosRequestConfig = {}): Promise<unknown> {
    return this.request('PUT', path, { data, ...config })
  }

  protected static async patch<Data = {}>(path: string, data?: Data, config: AxiosRequestConfig = {}): Promise<unknown> {
    return this.request('PATCH', path, { data, ...config })
  }

  protected static async delete<Data = {}>(path: string, data?: Data, config: AxiosRequestConfig = {}): Promise<unknown> {
    return this.request('DELETE', path, { data, ...config })
  }
}
