import { useQuery, UseQueryResult } from '@tanstack/react-query'

import { ModelResponse, ServerClient } from '../../../Lib/ServerApi'
import { Tag } from '../Tag'

type GetTagPrams = { tag: string }
type GetTagRes = ModelResponse<'tag', Tag>

export const getTag = ({ tag }: GetTagPrams): Promise<Tag> => {
  return ServerClient.get<GetTagRes>(`/tag/${tag}`)
    .then(res => res.tag)
}

export const useTag = (params: GetTagPrams): UseQueryResult<Tag> => {
  return useQuery({
    queryFn: () => getTag(params),
  })
}
