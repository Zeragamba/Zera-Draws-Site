import { Reducer } from '@reduxjs/toolkit'

import { changesReducer } from './ChangesReducer'
import { imagesReducer } from './ImagesReducer'
import { ImageData } from '../../Models/ImageData'
import { ImageChangeRecord } from '../ImageChangeRecord'

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
