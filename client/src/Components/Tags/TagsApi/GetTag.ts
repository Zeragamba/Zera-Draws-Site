import { QueryClient, useQuery, useQueryClient, UseQueryResult } from '@tanstack/react-query'

import { TagQueryKeys } from './QueryKeys'
import { ModelResponse, ServerClient } from '../../../Lib/ServerApi'
import { TagData } from '../TagData'

type GetTagParams = { tag: string }
type GetTagRes = ModelResponse<'tag', TagData>

export const getTag = ({ tag }: GetTagParams): Promise<TagData> => {
  return ServerClient.get<GetTagRes>(`/tag/${tag}`)
    .then(res => res.tag)
}

export const setTagCache = (queryClient: QueryClient, tag: TagData) => {
  queryClient.setQueryData(TagQueryKeys.getTag(tag.id), tag)
  queryClient.setQueryData(TagQueryKeys.getTag(tag.slug), tag)
  queryClient.setQueryData(TagQueryKeys.getTag(tag.name), tag)
}

export const useTag = (params: GetTagParams): UseQueryResult<TagData> => {
  const queryClient = useQueryClient()

  return useQuery({
    queryKey: TagQueryKeys.getTag(params.tag),
    queryFn: async () => {
      const tag = await getTag(params)
      setTagCache(queryClient, tag)
      return tag
    },
  })
}
