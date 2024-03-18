import { Reducer } from '@reduxjs/toolkit'

import { changesReducer } from './ChangesReducer'
import { imagesReducer } from './ImagesReducer'
import { ImageChangeRecord } from '../ImageChangeRecord'
import { ImageData } from '../ImageData'

export type State = {
  images: ImageData[]
  changes: ImageChangeRecord[]
}

const defaultState: State = { images: [], changes: [] }

export const rootReducer: Reducer<State> = (state = defaultState, action) => {
  return {
    images: imagesReducer(state.images, action),
    changes: changesReducer(state.changes, action),
  }
}
