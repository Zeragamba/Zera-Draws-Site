import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query'

import { ModelResponse, ServerClient } from '../../../Lib/ServerApi'
import { TagData } from '../TagData'
import { tagQueryKeys } from '../TagQueryKeys'

type MergeTagParams = { srcTagId: TagData['id']; destTagId: TagData['id'] }
type MergeTagRes = ModelResponse<'tag', TagData>

export const mergeTags = (params: MergeTagParams): Promise<TagData> => {
  return ServerClient.post<MergeTagRes>(`/tag/${params.srcTagId}/merge/${params.destTagId}`)
    .then(res => res.tag)
}

export const useMergeTags$ = (): UseMutationResult<TagData, unknown, MergeTagParams> => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (params) => mergeTags(params),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: tagQueryKeys._def })
    },
  })
}
