import { useMutation, UseMutationResult, useQuery, useQueryClient, UseQueryResult } from '@tanstack/react-query'

import { queryKeys } from './QueryKeys'
import { authApiClient } from '../Api'
import { ServerApiError, UserData } from '../Lib'

export const useLogin$ = () => {
  const queryClient = useQueryClient()

  return useMutation<UserData, ServerApiError, {
    username: string
    password: string
  }>({
    mutationFn: ({ username, password }) => authApiClient.loginPassword({ username, password }),
    onSuccess: () => queryClient.invalidateQueries(),
  })
}

export const useLogout$ = (): UseMutationResult<void> => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => authApiClient.logout(),
    onSuccess: () => queryClient.invalidateQueries(),
  })
}

export const useCurrentUser$ = (): UseQueryResult<UserData | null> => {
  return useQuery({
    ...queryKeys.auth.currentUser,
    queryFn: () => authApiClient.fetchCurrentUser(),
  })
}
