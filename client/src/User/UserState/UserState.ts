import { createReducer } from '@reduxjs/toolkit'

import { User } from '../UserApi'
import { setUser, userFetchComplete, userFetchStart } from './Actions'

export type UserState = {
  user: User | null
  fetching: boolean
}

const initialState: UserState = {
  user: null,
  fetching: false,
}

export const userReducer = createReducer(initialState, (builder) => {
  builder.addCase(userFetchStart, (state) => {
    state.fetching = true
  })

  builder.addCase(userFetchComplete, (state, action) => {
    state.fetching = false
    state.user = action.payload
  })

  builder.addCase(setUser, (state, action) => {
    state.user = action.payload
  })
})
