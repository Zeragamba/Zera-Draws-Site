import * as webauthn from '@github/webauthn-json/browser-ponyfill'
import { useMutation, UseMutationResult, useQuery, useQueryClient, UseQueryResult } from '@tanstack/react-query'

import { queryKeys } from './QueryKeys'
import { authApiClient, ServerApiError } from '../Api'
import { PasskeyData } from '../Api/Schemas'
import { UserData } from '../Models'

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

export const useUserPasskeys$ = (): UseQueryResult<PasskeyData[] | null> => {
  return useQuery({
    ...queryKeys.auth.passkeys,
    queryFn: () => authApiClient.passkeys.list(),
  })
}

export const useRegisterPasskey$ = (): UseMutationResult<PasskeyData, unknown, PasskeyData> => {
  return useMutation({
    mutationFn: async (passkey) => {
      const createOptions = await authApiClient.passkeys.register.challenge(passkey)

      const options = webauthn.parseCreationOptionsFromJSON({ publicKey: createOptions })

      return await authApiClient.passkeys.register.validate(
        passkey,
        createOptions.challenge,
        await webauthn.create(options),
      )
    },
  })
}
