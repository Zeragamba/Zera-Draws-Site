import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query'

import { userQueryKeys } from './UserQueryKeys'
import { ModelResponse, ServerApiError, ServerClient } from '../../ServerApi'
import { UserData } from '../UserData'

type Params = { username: string; password: string }

type RequestBody = Params
export type LoginRes = ModelResponse<'user', UserData> & { auth_token: string }

export const login = async ({ username, password }: Params): Promise<UserData> => {
  const res = await ServerClient.post<LoginRes, RequestBody>('/login', { username, password })
  ServerClient.authToken = res.auth_token
  return res.user
}

export const useLogin = (): UseMutationResult<UserData, ServerApiError, Params> => {
  const queryClient = useQueryClient()

  return useMutation<UserData, ServerApiError, Params>({
    mutationFn: login,
    onSuccess: async (user) => {
      await queryClient.invalidateQueries()
      queryClient.setQueryData(userQueryKeys.current.queryKey, user)
    },
  })
}
