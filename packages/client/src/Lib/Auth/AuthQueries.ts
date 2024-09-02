import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "@tanstack/react-query"

import { queryKeys } from "../../Queries/QueryKeys.ts"
import { ServerApiError } from "../../Api"
import { PasskeyData } from "./Passkeys"
import { queryClient } from "../QueryClient.ts"
import { UserData } from "../../Models"
import { authApiClient, RegisterPassKeyParams } from "./AuthApi.ts"

export const usePasswordLogin$ = () => {
  const queryClient = useQueryClient()

  return useMutation<
    UserData,
    ServerApiError,
    {
      username: string
      password: string
    }
  >({
    mutationFn: ({ username, password }) =>
      authApiClient.loginPassword({ username, password }),
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
  return useMutation<UserData, ServerApiError, object>({
    mutationFn: async () => authApiClient.passkeys.login(),
    onSuccess: () => queryClient.invalidateQueries(),
  })
}

export const useCreatePasskey$ = (): UseMutationResult<
  Omit<RegisterPassKeyParams, "passkey">,
  unknown,
  object
> => {
  return useMutation({
    mutationFn: async () => authApiClient.passkeys.create(),
  })
}

export const useRegisterPasskey$ = (): UseMutationResult<
  PasskeyData,
  unknown,
  RegisterPassKeyParams
> => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (params) => authApiClient.passkeys.register(params),
    onSuccess: (savedPasskey) => {
      queryClient.setQueryData(
        queryKeys.auth.passkeys.queryKey,
        (passkeys: PasskeyData[] = []) => {
          return [...passkeys, savedPasskey]
        },
      )
    },
  })
}

export const useUpdatePasskey$ = (): UseMutationResult<
  PasskeyData,
  unknown,
  PasskeyData
> => {
  return useMutation({
    mutationFn: async (passkey) => authApiClient.passkeys.update(passkey),
    onSuccess: (savedPasskey) => {
      queryClient.setQueryData(
        queryKeys.auth.passkeys.queryKey,
        (passkeys: PasskeyData[] = []) => {
          return passkeys.map((passkey) => {
            return passkey.id === savedPasskey.id ? savedPasskey : passkey
          })
        },
      )
    },
  })
}

export const useRemovePasskey$ = (): UseMutationResult<
  PasskeyData,
  unknown,
  PasskeyData
> => {
  return useMutation({
    mutationFn: async (passkey) => authApiClient.passkeys.remove(passkey),
    onSuccess: (savedPasskey) => {
      queryClient.setQueryData(
        queryKeys.auth.passkeys.queryKey,
        (passkeys: PasskeyData[] = []) => {
          return passkeys.filter((key) => key.id !== savedPasskey.id)
        },
      )
    },
  })
}
