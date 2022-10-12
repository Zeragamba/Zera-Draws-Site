import axios, { AxiosError, AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse, Method } from 'axios'

export const API_URL = process.env.REACT_APP_SERVER_URL

const axiosClient = axios.create({
  baseURL: API_URL,
})

export interface ErrorResponse extends AxiosResponse {
  data: {
    error: string
  }
}

export interface ServerApiError extends AxiosError {
  response: ErrorResponse
}

export function isServerApiError(error: unknown): error is ServerApiError {
  return (axios.isAxiosError(error) && error.response?.data.error)
}

export class ServerClient {
  static _authToken: string | null

  public static set authToken(newToken: string | null) {
    if (newToken === null) {
      sessionStorage.removeItem('authToken')
    } else {
      sessionStorage.setItem('authToken', newToken)
    }

    this._authToken = newToken
  }

  public static get authToken(): string {
    return this._authToken ||= sessionStorage.getItem('authToken') as string
  }

  private static addAuthHeader(headers: AxiosRequestHeaders = {}): AxiosRequestHeaders {
    if (!this.authToken) return headers

    return {
      ...headers,
      'Authorization': `Bearer ${this.authToken}`,
    }
  }

  public static async request<Res>(method: Method, path: string, config: AxiosRequestConfig = {}): Promise<Res> {
    try {
      const { headers, ...axiosConfig } = config

      const res = await axiosClient.request<Res>({
        method: method,
        url: path,
        headers: this.addAuthHeader(headers),
        ...axiosConfig,
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

  public static async post<Res, Data>(path: string, data?: Data, config: AxiosRequestConfig = {}): Promise<Res> {
    return this.request<Res>('POST', path, { data, ...config })
  }

  public static async put<Res, Data>(path: string, data?: Data, config: AxiosRequestConfig = {}): Promise<Res> {
    return this.request<Res>('PUT', path, { data, ...config })
  }

  public static async patch<Res, Data>(path: string, data?: Data, config: AxiosRequestConfig = {}): Promise<Res> {
    return this.request<Res>('PATCH', path, { data, ...config })
  }

  public static async delete<Res, Data>(path: string, data?: Data, config: AxiosRequestConfig = {}): Promise<Res> {
    return this.request<Res>('DELETE', path, { data, ...config })
  }
}
