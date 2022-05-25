import { createReducer } from '@reduxjs/toolkit'

import { User } from '../../User/UserApi'
import { setUser, userFetchComplete, userFetchStart } from '../Actions/UserActions'
import { AppSelector } from '../AppState'

export type UserState = {
  currentUser: User | null
  fetching: boolean
}

const initialState: UserState = {
  currentUser: null,
  fetching: false,
}

export const UserReducer = createReducer(initialState, (builder) => {
  builder.addCase(userFetchStart, (state) => {
    state.fetching = true
  })

  builder.addCase(userFetchComplete, (state) => {
    state.fetching = false
  })

  builder.addCase(setUser, (state, action) => {
    state.currentUser = action.payload
  })
})

export const selectCurrentUser: AppSelector<User | null> = (state) => state.user.currentUser
