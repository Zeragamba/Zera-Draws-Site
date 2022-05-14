import axios, { AxiosRequestConfig, AxiosResponse, Method } from 'axios'

import { isServerApiError, ServerApi } from './index'

export const API_URL = process.env.REACT_APP_SERVER_URL

console.log(API_URL)

async function request<Res extends AxiosResponse>(method: Method, path: string, config: AxiosRequestConfig = {}): Promise<Res> {
  config = {
    ...config,
    method,
    url: API_URL + path,
  }

  const authToken = ServerApi.getToken()
  if (authToken) {
    config.headers = {
      ...config.headers,
      'Authorization': `Bearer ${authToken}`,
    }
  }

  const request: Promise<Res> = axios.request(config)

  request.catch(error => {
    if (isServerApiError(error) && error.response.data.error === 'Invalid token') {
      ServerApi.delToken()
    }

    console.error(error)
  })

  return request
}

export default request
