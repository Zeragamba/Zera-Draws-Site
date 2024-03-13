import { QueryClient, useQuery, useQueryClient, UseQueryResult } from '@tanstack/react-query'

import { TagQueryKeys } from './QueryKeys'
import { ModelResponse, ServerClient } from '../../ServerApi'
import { TagData } from '../TagData'

type GetTagParams = { tagId?: string }
type GetTagRes = ModelResponse<'tag', TagData>

export const getTag = ({ tagId }: GetTagParams): Promise<TagData> => {
  return ServerClient.get<GetTagRes>(`/tag/${tagId}`)
    .then(res => res.tag)
}

export const setTagCache = (queryClient: QueryClient, tag: TagData) => {
  queryClient.setQueryData(TagQueryKeys.getTag(tag.id), tag)
  queryClient.setQueryData(TagQueryKeys.getTag(tag.slug), tag)
  queryClient.setQueryData(TagQueryKeys.getTag(tag.name), tag)
}

export const useTag$ = (params: GetTagParams): UseQueryResult<TagData> => {
  const queryClient = useQueryClient()

  return useQuery({
    queryKey: TagQueryKeys.getTag(params.tagId),
    queryFn: async () => {
      const tag = await getTag(params)
      setTagCache(queryClient, tag)
      return tag
    },
  })
}
