import { createReducer } from '@reduxjs/toolkit'

import { Tag } from '../TagsApi'
import { setTags, tagsFetchComplete, tagsFetchStart } from './Actions'

export type TagsState = {
  tags: Tag[]
  fetching: boolean
}

const initialState: TagsState = {
  tags: [],
  fetching: false,
}

export const tagsReducer = createReducer(initialState, (builder) => {
  builder.addCase(tagsFetchStart, (state) => {
    state.fetching = true
  })

  builder.addCase(tagsFetchComplete, (state, action) => {
    state.fetching = false
    state.tags = action.payload
  })

  builder.addCase(setTags, (state, action) => {
    state.tags = action.payload
  })
})
