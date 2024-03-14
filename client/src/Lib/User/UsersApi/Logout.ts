import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query'

import { userQueryKeys } from './UserQueryKeys'
import { serverAuthClient } from '../../../Api/Endpoints/ServerAuthClient'

export const useLogout = (): UseMutationResult<void> => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => serverAuthClient.logout(),
    onSuccess: async () => {
      await queryClient.invalidateQueries()
      queryClient.setQueryData(userQueryKeys.current.queryKey, null)
    },
  })
}
