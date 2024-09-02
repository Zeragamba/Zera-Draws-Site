import { Reducer } from "@reduxjs/toolkit"
import { ImageChangeRecord } from "../ImageChangeRecord"
import { ImageData } from "../ImageData"

import { changesReducer } from "./ChangesReducer"
import { imagesReducer } from "./ImagesReducer"

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
