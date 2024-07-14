import * as webauthn from '@github/webauthn-json/browser-ponyfill'
import { RegistrationPublicKeyCredential } from '@github/webauthn-json/browser-ponyfill'
import z from 'zod'

import { UserData } from '../../Models'
import { authTokenStore } from '../AuthTokenStore'
import { isServerApiError } from '../Errors'
import {
  PasskeyCreateChallengeSchema,
  PasskeyData,
  PasskeyListResSchema,
  PasskeyLoginChallengeSchema,
  PasskeyResSchema,
  UserDataSchema,
  UserResSchema,
} from '../Schemas'
import { ServerApi } from '../ServerApi'

export interface RegisterPassKeyParams {
  passkey: PasskeyData
  challenge: string
  publicKeyCredential: RegistrationPublicKeyCredential
}

class AuthApi extends ServerApi {
  public passkeys = {
    login: async (): Promise<UserData> => {
      console.info('Starting passkey login')
      const challengeData = await this.get('/login/passkey', {
        parseResData: (data) => PasskeyLoginChallengeSchema.parse(data),
      })

      console.debug('Received challenge from server')
      const options = webauthn.parseRequestOptionsFromJSON({ publicKey: challengeData })

      console.info('Requesting passkey login')
      const publicKeyCredential = await webauthn.get(options)

      const { user, auth_token } = await this.post('/login/passkey', {
        data: {
          challenge: challengeData.challenge,
          publicKeyCredential: publicKeyCredential,
        },
        parseResData: (data) => {
          return z.object({ user: UserDataSchema, auth_token: z.string() }).parse(data)
        },
      })

      authTokenStore.authToken = auth_token

      return user
    },

    create: async (): Promise<Omit<RegisterPassKeyParams, 'passkey'>> => {
      const challengeData = await this.get('/user/me/passkey/new', {
        parseResData: (data) => PasskeyCreateChallengeSchema.parse(data),
      })

      const options = webauthn.parseCreationOptionsFromJSON({ publicKey: challengeData })
      return {
        challenge: challengeData.challenge,
        publicKeyCredential: await webauthn.create(options),
      }
    },

    register: async ({ passkey, challenge, publicKeyCredential }: RegisterPassKeyParams): Promise<PasskeyData> => {
      return this.post('/user/me/passkey', {
        data: { passkey, challenge, publicKeyCredential },
        parseResData: (data) => PasskeyResSchema
          .transform((data) => data.passkey)
          .parse(data),
      })
    },

    list: () => {
      return this.get('/user/me/passkey', {
        parseResData: (data) => PasskeyListResSchema
          .transform((data) => data.passkeys)
          .parse(data),
      })
    },

    update: (passkey: PasskeyData) => {
      return this.put(`/user/me/passkey/${passkey.id}`, {
        data: { passkey },
        parseResData: (data) => PasskeyResSchema
          .transform((data) => data.passkey)
          .parse(data),
      })
    },

    remove: (passkey: PasskeyData) => {
      return this.delete(`/user/me/passkey/${passkey.id}`, {
        parseResData: (data) => PasskeyResSchema
          .transform((data) => data.passkey)
          .parse(data),
      })
    },
  }

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
