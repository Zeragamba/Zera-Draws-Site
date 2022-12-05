import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query'

import { ModelResponse } from '../../../Lib/ServerApi/Response'
import { ServerApiError, ServerClient } from '../../../Lib/ServerApi/ServerClient'
import { User } from '../User'
import { userQueryKeys } from './UserQueryKeys'

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
      await queryClient.setQueryData(userQueryKeys.getCurrentUser(), user)
    },
  })
}
