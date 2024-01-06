import { useQuery, useQueryClient, UseQueryResult } from '@tanstack/react-query'

import { TagQueryKeys } from './QueryKeys'
import { PagedModelResponse, ServerClient } from '../../../Lib/ServerApi'
import { TagData } from '../TagData'
import { byTagName } from '../TagSorters'

type GetAllTagParams = {}
type GetAllTagRes = PagedModelResponse<'tags', TagData>

export const getAllTags = async (): Promise<TagData[]> => {
  const res = await ServerClient.get<GetAllTagRes>('/tags')
  const tags = res.tags
  return tags.sort(byTagName.ascending())
}

type UseAllTagsParams = GetAllTagParams & {
  enabled?: boolean
}

export const useAllTags$ = ({ enabled }: UseAllTagsParams = {}): UseQueryResult<TagData[]> => {
  const queryClient = useQueryClient()

  return useQuery({
    enabled,
    ...TagQueryKeys.getAllTags(queryClient),
  })
}
