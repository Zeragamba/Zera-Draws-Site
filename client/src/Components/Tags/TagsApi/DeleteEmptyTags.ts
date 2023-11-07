import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query'

import { PagedModelResponse, ServerClient } from '../../../Lib/ServerApi'
import { TagData } from '../TagData'
import { tagQueryKeys } from '../TagQueryKeys'

type DeleteEmptyTagsRes = PagedModelResponse<'tags', TagData>

export const deleteEmptyTags = (): Promise<TagData[]> => {
  return ServerClient.delete<DeleteEmptyTagsRes>('/tags/empty')
    .then(res => res.tags)
}

export const useDeleteEmptyTags$ = (): UseMutationResult<TagData[], unknown, void> => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => deleteEmptyTags(),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: tagQueryKeys._def })
    },
  })
}
