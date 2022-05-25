import { createReducer } from '@reduxjs/toolkit'

import { Tag } from '../../Tags/TagsApi'
import { setTags, tagsFetchComplete, tagsFetchStart } from '../Actions/TagActions'

export type TagsState = {
  tags: Tag[]
  fetching: boolean
}

const initialState: TagsState = {
  tags: [],
  fetching: false,
}

export const TagsReducer = createReducer(initialState, (builder) => {
  builder.addCase(tagsFetchStart, (state) => {
    state.fetching = true
  })

  builder.addCase(tagsFetchComplete, (state) => {
    state.fetching = false
  })

  builder.addCase(setTags, (state, action) => {
    state.tags = action.payload
  })
})
