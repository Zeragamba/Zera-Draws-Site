import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query'

import { userQueryKeys } from './UserQueryKeys'
import { serverAuthClient } from '../../../Api/Endpoints/ServerAuthClient'
import { ServerApiError } from '../../ServerApi'
import { UserData } from '../UserData'

type Params = { username: string; password: string }

export const useLogin = (): UseMutationResult<UserData, ServerApiError, Params> => {
  const queryClient = useQueryClient()

  return useMutation<UserData, ServerApiError, Params>({
    mutationFn: ({ username, password }) => serverAuthClient.loginPassword({ username, password }),
    onSuccess: async (user) => {
      await queryClient.invalidateQueries()
      queryClient.setQueryData(userQueryKeys.current.queryKey, user)
    },
  })
}
