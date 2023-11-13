import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query'

import { SiteMetaData } from './SiteMetaData'
import { SiteMetaQueries } from './SiteMetaQueries'
import { ServerClient } from '../../Lib/ServerApi'

type UpdateMataParams = {
  group: string
  values: SiteMetaData
}

export const useUpdateMeta = (): UseMutationResult<string, unknown, UpdateMataParams> => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ group, values }) => {
      return ServerClient.put(`/meta/${group}`, values)
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: SiteMetaQueries.get._def })
    },
  })
}
