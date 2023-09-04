import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, isAxiosError, Method } from 'axios'

import { Config } from '../../Config'

export interface ErrorResponse extends AxiosResponse {
  data: {
    error: string
  }
}

export function isErrorResponse(obj: unknown): obj is ErrorResponse {
  if (!obj) return false

  const errorRes = obj as ErrorResponse

  return (
    typeof errorRes === 'object'
    && typeof errorRes.data === 'object'
    && typeof errorRes.data.error === 'string'
  )
}

export interface ServerApiError extends AxiosError {
  response: ErrorResponse
}

export function isServerApiError(error: unknown): error is ServerApiError {
  return (isAxiosError(error) && error.response?.data.error)
}

export function isNotFoundError(error: unknown): error is ServerApiError {
  if (!isServerApiError(error)) return false
  return error.response.status === 404
}

export class ServerClient {
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

  public static async request<Res>(method: Method, path: string, config: AxiosRequestConfig = {}): Promise<Res> {
    try {
      let { headers } = config

      if (this.authToken) {
        headers = {
          ...headers,
          'Authorization': `Bearer ${this.authToken}`,
        }
      }

      const res = await this.axios.request<Res>({
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

  public static async get<Res>(path: string, config: AxiosRequestConfig = {}): Promise<Res> {
    return this.request<Res>('GET', path, config)
  }

  public static async post<Res, Data = {}>(path: string, data?: Data, config: AxiosRequestConfig = {}): Promise<Res> {
    return this.request<Res>('POST', path, { data, ...config })
  }

  public static async put<Res, Data = {}>(path: string, data?: Data, config: AxiosRequestConfig = {}): Promise<Res> {
    return this.request<Res>('PUT', path, { data, ...config })
  }

  public static async patch<Res, Data = {}>(path: string, data?: Data, config: AxiosRequestConfig = {}): Promise<Res> {
    return this.request<Res>('PATCH', path, { data, ...config })
  }

  public static async delete<Res, Data = {}>(path: string, data?: Data, config: AxiosRequestConfig = {}): Promise<Res> {
    return this.request<Res>('DELETE', path, { data, ...config })
  }
}
