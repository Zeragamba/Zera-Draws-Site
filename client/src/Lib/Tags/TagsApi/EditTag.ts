import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query'

import { setTagCache } from './GetTag'
import { ModelResponse, ServerClient } from '../../ServerApi'
import { EditableTagData, TagData } from '../TagData'

type EditTagParams = { tagId: TagData['id']; tag: Partial<EditableTagData> }
type EditTagRes = ModelResponse<'tag', TagData>

export const editTag = (params: EditTagParams): Promise<TagData> => {
  return ServerClient.patch<EditTagRes>(`/tag/${params.tagId}`, {
    tag: params.tag,
  }).then(res => res.tag)
}

export const useEditTag = (): UseMutationResult<TagData, unknown, EditTagParams> => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (params) => editTag(params),
    onSuccess: (tag) => setTagCache(queryClient, tag),
  })
}
