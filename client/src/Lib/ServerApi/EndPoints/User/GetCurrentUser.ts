import { useQuery, UseQueryResult } from '@tanstack/react-query'

import { User } from '../../Models'
import { isServerApiError, ServerClient } from '../../ServerClient'
import { QueryKeys } from '../QueryKeys'
import { ModelResponse } from '../Response'

export type GetCurrentUserRes = ModelResponse<'user', User>

export const getCurrentUser = (): Promise<User | null> => {
  return ServerClient.get<GetCurrentUserRes>('/user/me')
    .then(res => res.user)
    .catch(error => {
      if (isServerApiError(error)) {
        if (error.response.status === 401) {
          return null
        }
      }

      throw error
    })
}

export const useCurrentUser = (): UseQueryResult<User | null> => {
  return useQuery({
    queryKey: QueryKeys.user.getCurrentUser(),
    queryFn: () => getCurrentUser(),
    enabled: ServerClient.authToken !== null,
  })
}
