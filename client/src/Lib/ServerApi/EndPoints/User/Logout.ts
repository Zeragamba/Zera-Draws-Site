import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query'

import { ServerClient } from '../../ServerClient'
import { QueryKeys } from '../QueryKeys'

export const logout = async (): Promise<void> => {
  ServerClient.authToken = null
}

export const useLogout = (): UseMutationResult => {
  const queryClient = useQueryClient()

  return useMutation(logout, {
    onSuccess: async () => {
      queryClient.setQueryData(QueryKeys.user.getCurrentUser(), null)
    },
  })
}
