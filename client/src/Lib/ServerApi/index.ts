import axios, { AxiosError, AxiosResponse } from 'axios'

import request from './request'

export * from './models'
export * from './useServerApi'
export * from './PicturesApi'

export type ServerToken = string

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

let token: ServerToken | null = null

export const ServerApi = {
  request,

  setToken(newToken: ServerToken): void {
    sessionStorage.setItem('authToken', newToken)
    token = newToken
  },

  getToken(): ServerToken {
    return token ||= sessionStorage.getItem('authToken') as ServerToken
  },

  delToken(): void {
    sessionStorage.removeItem('authToken')
    token = null
  },
}
