import { useMutation, UseMutationResult, useQuery, useQueryClient, UseQueryResult } from '@tanstack/react-query'

import { queryKeys } from './QueryKeys'
import { authApiClient, ServerApiError } from '../Api'
import { PasskeyData } from '../Api/Schemas'
import { queryClient } from '../App/QueryClient'
import { UserData } from '../Models'

export const usePasswordLogin$ = () => {
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

export const useUserPasskeys$ = (): UseQueryResult<PasskeyData[] | null> => {
  return useQuery({
    ...queryKeys.auth.passkeys,
    queryFn: () => authApiClient.passkeys.list(),
  })
}

export const usePasskeyLogin$ = () => {
  return useMutation<UserData, ServerApiError, {}>({
    mutationFn: async () => authApiClient.passkeys.login(),
    onSuccess: () => queryClient.invalidateQueries(),
  })
}

export const useRegisterPasskey$ = (): UseMutationResult<PasskeyData, unknown, PasskeyData> => {
  return useMutation({
    mutationFn: async (passkey) => authApiClient.passkeys.register(passkey),
  })
}
