import { Reducer } from "@reduxjs/toolkit"

import { changesReducer } from "./ChangesReducer.ts"
import { imagesReducer } from "./ImagesReducer.ts"
import { ImageData } from "../../../Models/ImageData.ts"
import { ImageChangeRecord } from "../ImageChangeRecord.ts"

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
