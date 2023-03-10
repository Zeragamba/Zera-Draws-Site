import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query'

import { setTagCache } from './GetTag'
import { ModelResponse, ServerClient } from '../../../Lib/ServerApi'
import { EditableTagData, TagData } from '../TagData'

type CreateTagParams = { tag: EditableTagData }
type CreateTagRes = ModelResponse<'tag', TagData>

export const createTag = (data: CreateTagParams): Promise<TagData> => {
  return ServerClient.post<CreateTagRes, CreateTagParams>('/tags', data)
    .then(res => res.tag)
}

export const useCreateTag$ = (): UseMutationResult<TagData, unknown, CreateTagParams> => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (params) => createTag(params),
    onSuccess: (tag) => setTagCache(queryClient, tag),
  })
}
