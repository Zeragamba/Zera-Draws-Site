import { useReducer } from 'react'

import * as Actions from './Actions'
import { rootReducer, State } from './rootReducer'

type UseImageManagerProps = {
  images?: State['images']
}

type UseImageManagerResult = State & {
  addImage: (params: Actions.AddImagePayload) => void
  editImage: (params: Actions.EditImagePayload) => void
  removeImage: (params: Actions.RemoveImagePayload) => void
  setImages: (params: Actions.SetImagesPayload) => void
}

export function useImageManager({ images = [] }: UseImageManagerProps = {}): UseImageManagerResult {
  const [ state, dispatch ] = useReducer(rootReducer, { images, changes: [] })

  return {
    ...state,
    addImage: (params) => dispatch(Actions.addImage(params)),
    editImage: (params) => dispatch(Actions.editImage(params)),
    removeImage: (params) => dispatch(Actions.removeImage(params)),
    setImages: (params) => dispatch(Actions.setImages(params)),
  }
}
