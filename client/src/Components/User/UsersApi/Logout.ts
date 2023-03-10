import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query'

import { userQueryKeys } from './UserQueryKeys'
import { ServerClient } from '../../../Lib/ServerApi'

export const logout = async (): Promise<void> => {
  ServerClient.authToken = null
}

export const useLogout = (): UseMutationResult<void> => {
  const queryClient = useQueryClient()

  return useMutation(logout, {
    onSuccess: async () => {
      await queryClient.invalidateQueries()
      queryClient.setQueryData(userQueryKeys.current.queryKey, null)
    },
  })
}
