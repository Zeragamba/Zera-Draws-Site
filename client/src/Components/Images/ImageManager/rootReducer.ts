import { Reducer } from '@reduxjs/toolkit'

import { ImageChangePayload } from '../../Posts/PostsApi/EditPost'
import { Image } from '../Image'
import { changesReducer } from './ChangesReducer'
import { imagesReducer } from './ImagesReducer'

export type State = {
  images: Image[]
  changes: ImageChangePayload[]
}

const defaultState: State = { images: [], changes: [] }

export const rootReducer: Reducer<State> = (state = defaultState, action) => {
  return {
    images: imagesReducer(state.images, action),
    changes: changesReducer(state.changes, action),
  }
}
