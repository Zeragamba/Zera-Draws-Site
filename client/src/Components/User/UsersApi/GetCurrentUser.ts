import { useQuery, UseQueryResult } from '@tanstack/react-query'

import { userQueryKeys } from './UserQueryKeys'
import { isServerApiError, ModelResponse, ServerClient } from '../../../Lib/ServerApi'
import { UserData } from '../UserData'

export type GetCurrentUserRes = ModelResponse<'user', UserData>

export const getCurrentUser = (): Promise<UserData | null> => {
  return ServerClient.get<GetCurrentUserRes>('/user/me')
    .then(res => res.user)
    .catch(error => {
      if (isServerApiError(error)) {
        if (error.response.status === 401) return null
        if (error.response.status === 404) return null
      }

      throw error
    })
}

export const useCurrentUser = (): UseQueryResult<UserData | null> => {
  return useQuery({
    ...userQueryKeys.current,
    queryFn: () => getCurrentUser(),
    enabled: ServerClient.authToken !== null,
  })
}

export const useIsAdmin = (): boolean => {
  const { data: currentUser } = useCurrentUser()
  return currentUser?.admin || false
}
