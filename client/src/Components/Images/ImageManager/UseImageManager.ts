import { useReducer } from 'react'

import * as Actions from './Actions'
import { rootReducer } from './rootReducer'
import { ImageChangeRecord } from '../ImageApi/ImageChangeRecord'
import { ImageData } from '../ImageData'

export type UseImageManagerProps = {
  images?: ImageData[]
}

export type ImageManager = {
  images: ImageData[]
  changes: ImageChangeRecord[]
  addImage: (params: Actions.AddImagePayload) => void
  editImage: (params: Actions.EditImagePayload) => void
  removeImage: (params: Actions.RemoveImagePayload) => void
  setImages: (params: Actions.SetImagesPayload) => void
}

export function useImageManager({ images = [] }: UseImageManagerProps = {}): ImageManager {
  const [ state, dispatch ] = useReducer(rootReducer, { images, changes: [] })

  console.log(state)

  return {
    images: state.images,
    changes: state.changes,
    addImage: (params) => dispatch(Actions.addImage(params)),
    editImage: (params) => dispatch(Actions.editImage(params)),
    removeImage: (params) => dispatch(Actions.removeImage(params)),
    setImages: (params) => dispatch(Actions.setImages(params)),
  }
}
