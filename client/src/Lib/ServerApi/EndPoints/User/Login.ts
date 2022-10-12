import { useMutation, UseMutationResult, useQueryClient } from 'react-query'

import { User } from '../../Models/User'
import { ServerApiError, ServerClient } from '../../ServerClient'
import { QueryKeys } from '../QueryKeys'
import { ModelResponse } from '../Response'

type Params = { username: string; password: string }

type RequestBody = Params
export type LoginRes = ModelResponse<'user', User> & { auth_token: string }

export const login = async ({ username, password }: Params): Promise<User> => {
  const res = await ServerClient.post<LoginRes, RequestBody>('/login', { username, password })
  ServerClient.authToken = res.auth_token
  return res.user
}

export const useLogin = (): UseMutationResult<User, ServerApiError, Params> => {
  const queryClient = useQueryClient()

  return useMutation<User, ServerApiError, Params>(login, {
    onSuccess: async (user) => {
      await queryClient.setQueryData(QueryKeys.user.getCurrentUser(), user)
    },
  })
}
