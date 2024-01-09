import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query'

import { userQueryKeys } from './UserQueryKeys'
import { ServerClient } from '../../ServerApi'

export const logout = async (): Promise<void> => {
  ServerClient.authToken = null
}

export const useLogout = (): UseMutationResult<void> => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: logout,
    onSuccess: async () => {
      await queryClient.invalidateQueries()
      queryClient.setQueryData(userQueryKeys.current.queryKey, null)
    },
  })
}
