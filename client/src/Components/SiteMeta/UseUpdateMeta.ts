import { useMutation, UseMutationResult } from '@tanstack/react-query'

import { SiteMetaData } from './SiteMetaData'
import { ServerClient } from '../../Lib/ServerApi'

type UpdateMataParams = {
  group: string
  values: SiteMetaData
}

export const useUpdateMeta = (): UseMutationResult<string, unknown, UpdateMataParams> => {
  return useMutation({
    mutationFn: ({ group, values }) => {
      return ServerClient.put(`/meta/${group}`, values)
    },
  })
}
