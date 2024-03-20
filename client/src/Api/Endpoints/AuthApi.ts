import z from 'zod'

import { UserData } from '../../Models'
import { authTokenStore } from '../AuthTokenStore'
import { isServerApiError } from '../Errors'
import { UserDataSchema, UserResSchema } from '../Schemas'
import { ServerApi } from '../ServerApi'


class AuthApi extends ServerApi {
  public async logout(): Promise<void> {
    await this.post('/logout', {
      parseResData: (data) => {
        return z.object({ success: z.boolean() })
          .parse(data)
      },
    })

    authTokenStore.authToken = null
  }

  public async loginPassword(params: {
    username: string
    password: string
  }): Promise<UserData> {
    const { user, auth_token } = await this.post('/login', {
      data: {
        username: params.username,
        password: params.password,
      },
      parseResData: (data) => {
        return z.object({ user: UserDataSchema, auth_token: z.string() })
          .parse(data)
      },
    })

    authTokenStore.authToken = auth_token

    return user
  }

  public async fetchCurrentUser(): Promise<UserData | null> {
    if (authTokenStore.authToken === null) return null

    try {
      return this.get('/user/me', {
        parseResData: (data) => UserResSchema.parse(data),
      })
    } catch (error) {
      if (isServerApiError(error)) {
        if (error.response.status === 401) return null
        if (error.response.status === 404) return null
      }

      throw error
    }
  }
}

export const authApiClient = new AuthApi()
