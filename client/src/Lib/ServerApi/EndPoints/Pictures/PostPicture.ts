import { useMutation, UseMutationResult, useQueryClient } from 'react-query'

import { EditablePicture, Picture } from '../../Models'
import { ServerClient } from '../../ServerClient'
import { QueryKeys } from '../QueryKeys'
import { ModelResponse } from '../Response'

type Params = { picture: EditablePicture; image: File }

export type CreatePictureRes = ModelResponse<'picture', Picture>

export const createPicture = ({ picture, image }: Params): Promise<Picture> => {
  const formData = new FormData()


  Object.entries(picture).forEach(([ prop, value ]) => {
    formData.set(`picture[${prop}]`, value)
  })

  formData.set('image', image)

  return ServerClient.post<CreatePictureRes, FormData>('/pictures', formData)
    .then(res => res.picture)
}

export const useCreatePicture = (): UseMutationResult<Picture, unknown, Params> => {
  const queryClient = useQueryClient()

  return useMutation<Picture, unknown, Params>(createPicture, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(QueryKeys.pictures.prefix())
    },
  })
}
