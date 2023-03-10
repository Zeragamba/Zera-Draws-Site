import { useQuery, useQueryClient, UseQueryResult } from '@tanstack/react-query'

import { setTagCache } from './GetTag'
import { TagQueryKeys } from './QueryKeys'
import { PagedModelResponse, ServerClient } from '../../../Lib/ServerApi'
import { TagData } from '../TagData'
import { byTagName } from '../TagSorters'

type GetAllTagParams = {}
type GetAllTagRes = PagedModelResponse<'tags', TagData>

export const getAllTags = (_params: GetAllTagParams = {}): Promise<TagData[]> => {
  return ServerClient.get<GetAllTagRes>('/tags')
    .then(res => res.tags)
    .then(tags => tags.sort(byTagName.ascending()))
}

type UseAllTagsParams = GetAllTagParams & {
  enabled?: boolean
}

export const useAllTags$ = ({ enabled, ...params }: UseAllTagsParams = {}): UseQueryResult<TagData[]> => {
  const queryClient = useQueryClient()

  return useQuery({
    enabled,
    queryKey: TagQueryKeys.getAllTags(),
    queryFn: () => getAllTags(params),
    onSuccess: (tags) => {
      tags.forEach(tag => setTagCache(queryClient, tag))
    },
  })
}
