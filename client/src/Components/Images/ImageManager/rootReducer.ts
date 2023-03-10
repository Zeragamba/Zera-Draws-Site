import { Reducer } from '@reduxjs/toolkit'

import { changesReducer } from './ChangesReducer'
import { imagesReducer } from './ImagesReducer'
import { ImageChangePayload } from '../../Posts/PostsApi/EditPost'
import { ImageData } from '../ImageData'

export type State = {
  images: ImageData[]
  changes: ImageChangePayload[]
}

const defaultState: State = { images: [], changes: [] }

export const rootReducer: Reducer<State> = (state = defaultState, action) => {
  return {
    images: imagesReducer(state.images, action),
    changes: changesReducer(state.changes, action),
  }
}
