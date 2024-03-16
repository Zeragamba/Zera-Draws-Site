import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'

import { authTokenStore } from './AuthTokenStore'
import { isServerApiError } from './Errors'
import { Config } from '../Config'

export interface RequestConfig<Data> extends AxiosRequestConfig {
  parseData: (data: object) => Data
}

export abstract class ServerApi {
  private readonly axios: AxiosInstance

  constructor() {
    this.axios = axios.create({ baseURL: Config.SERVER_URL })
  }

  protected async request<Data>(path: string, config: RequestConfig<Data>): Promise<Data> {
    const authToken = authTokenStore.authToken

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
        authTokenStore.authToken = null
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
