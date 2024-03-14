import z from 'zod'

import { UserData } from '../../Lib'
import { UserDataSchema } from '../Schemas/UserDataSchema'
import { serverApiAuthStore, ServerClient } from '../ServerClient'


class ServerAuthClient extends ServerClient {
  public async logout(): Promise<void> {
    await this.post('/logout', {
      parseData: (data) => {
        return z.object({ success: z.boolean() })
          .parse(data)
      },
    })

    serverApiAuthStore.authToken = null
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
      parseData: (data) => {
        return z.object({ user: UserDataSchema, auth_token: z.string() })
          .parse(data)
      },
    })

    serverApiAuthStore.authToken = auth_token

    return user
  }
}

export const serverAuthClient = new ServerAuthClient()
