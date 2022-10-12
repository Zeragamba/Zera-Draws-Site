import { useQuery, UseQueryResult } from 'react-query'

import { Picture } from '../../Models'
import { ServerClient } from '../../ServerClient'
import { QueryKeys } from '../QueryKeys'
import { PagedModelResponse } from '../Response'

type Params = { numImages?: number }

type ResponseBody = PagedModelResponse<'pictures', Picture>

export const getRecentPictures = ({ numImages }: Params): Promise<Picture[]> => {
  return ServerClient.get<ResponseBody>('/pictures/recent', { params: { numImages } })
    .then(res => res.pictures)
}

export const useRecentPictures = (params: Params): UseQueryResult<Picture[]> => {
  return useQuery({
    queryKey: QueryKeys.pictures.getRecent(),
    queryFn: () => getRecentPictures(params),
  })
}
