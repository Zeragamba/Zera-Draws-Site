import { useQuery, useQueryClient, UseQueryResult } from 'react-query'

import { Picture } from '../../Models'
import { ServerClient } from '../../ServerClient'
import { QueryKeys } from '../QueryKeys'
import { ModelResponse } from '../Response'
import { GetAllPicturesRes } from './GetAllPictures'

type Params = { pictureId: Picture['id'] }

type ResponseBody = ModelResponse<'picture', Picture>

export const getPicture = ({ pictureId }: Params): Promise<Picture> => {
  return ServerClient.get<ResponseBody>(`/pictures/${pictureId}`)
    .then(res => res.picture)
}

export const usePicture = (params: Params): UseQueryResult<Picture> => {
  const queryClient = useQueryClient()

  return useQuery({
    queryKey: QueryKeys.pictures.getPicture(params.pictureId),
    queryFn: () => getPicture(params),
    initialData: () => {
      const cachedData = queryClient.getQueryData<{ pages: GetAllPicturesRes[] }>(QueryKeys.pictures.getAllPictures())
      if (!cachedData) return

      return cachedData.pages
        .map(page => page.pictures)
        .flat()
        .find(picture => picture.id === params.pictureId)
    },
  })
}
