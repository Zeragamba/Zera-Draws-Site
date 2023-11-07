import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query'

import { ModelResponse, ServerClient } from '../../../Lib/ServerApi'
import { TagData } from '../TagData'
import { tagQueryKeys } from '../TagQueryKeys'

type DeleteTagParams = { tagId: TagData['id'] }
type DeleteTagRes = ModelResponse<'tag', TagData>

export const deleteTag = (params: DeleteTagParams): Promise<TagData> => {
  return ServerClient.delete<DeleteTagRes>(`/tag/${params.tagId}`)
    .then(res => res.tag)
}

export const useDeleteTag$ = (): UseMutationResult<TagData, unknown, DeleteTagParams> => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (params) => deleteTag(params),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: tagQueryKeys._def })
    },
  })
}
