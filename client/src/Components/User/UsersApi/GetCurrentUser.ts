import { useQuery, UseQueryResult } from '@tanstack/react-query'

import { ModelResponse } from '../../../Lib/ServerApi/Response'
import { isServerApiError, ServerClient } from '../../../Lib/ServerApi/ServerClient'
import { User } from '../User'
import { userQueryKeys } from './UserQueryKeys'

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
    queryKey: userQueryKeys.getCurrentUser(),
    queryFn: () => getCurrentUser(),
    enabled: ServerClient.authToken !== null,
  })
}
