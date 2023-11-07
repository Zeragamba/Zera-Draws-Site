import { QueryClient, useQuery, useQueryClient, UseQueryResult } from '@tanstack/react-query'

import { TagQueryKeys } from './QueryKeys'
import { ModelResponse, ServerClient } from '../../../Lib/ServerApi'
import { TagData } from '../TagData'
import { byTagName } from '../TagSorters'

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
  queryClient.setQueryData(TagQueryKeys.getAllTags(), (tags: TagData[] | undefined) => {
    if (tags === undefined) {
      return [ tag ]
    } else if (tags.some(t => t.id === tag.id)) {
      return tags.map(t => t.id === tag.id ? tag : t).sort(byTagName.ascending())
    } else {
      return [ ...tags, tag ].sort(byTagName.ascending())
    }
  })
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
