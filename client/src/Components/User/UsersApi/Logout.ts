import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query'

import { ServerClient } from '../../../Lib/ServerApi/ServerClient'
import { userQueryKeys } from './UserQueryKeys'

export const logout = async (): Promise<void> => {
  ServerClient.authToken = null
}

export const useLogout = (): UseMutationResult<void> => {
  const queryClient = useQueryClient()

  return useMutation(logout, {
    onSuccess: async () => {
      queryClient.setQueryData(userQueryKeys.getCurrentUser(), null)
    },
  })
}
