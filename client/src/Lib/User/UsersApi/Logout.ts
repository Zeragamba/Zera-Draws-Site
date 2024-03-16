import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query'

import { userQueryKeys } from './UserQueryKeys'
import { authApiClient } from '../../../Api'

export const useLogout = (): UseMutationResult<void> => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => authApiClient.logout(),
    onSuccess: async () => {
      await queryClient.invalidateQueries()
      queryClient.setQueryData(userQueryKeys.current.queryKey, null)
    },
  })
}
