import { AxiosResponse } from 'axios'

import { ServerApi, ServerToken } from '../Lib/ServerApi'

export type User = {
  username: string
  email: string
  admin: boolean
}

interface UserResponse extends AxiosResponse {
  data: User
}

interface LoginResponse extends AxiosResponse {
  data: {
    token: ServerToken
  }
}

export const UserApi = {
  login(username: string, password: string): Promise<User> {
    const data = { username, password }
    return ServerApi
      .request<LoginResponse>('POST', '/login', { data })
      .then(res => ServerApi.setToken(res.data.token))
      .then(() => UserApi.getCurrent())
  },

  getCurrent(): Promise<User> {
    return ServerApi.request<UserResponse>('GET', '/user/me')
      .then(res => res.data)
  },
}
