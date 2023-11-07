import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query'

import { setTagCache } from './GetTag'
import { ModelResponse, ServerClient } from '../../../Lib/ServerApi'
import { EditableTagData, TagData } from '../TagData'

type CreateTagParams = { tag: EditableTagData }
type CreateTagRes = ModelResponse<'tag', TagData>

export async function createTag(data: CreateTagParams): Promise<TagData> {
  const res = await ServerClient.post<CreateTagRes, CreateTagParams>('/tags', data)
  return res.tag
}

export const useCreateTag$ = (): UseMutationResult<TagData, unknown, CreateTagParams> => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (params) => createTag(params),
    onSuccess: (tag) => setTagCache(queryClient, tag),
  })
}
