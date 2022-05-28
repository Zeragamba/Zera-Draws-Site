import { createReducer } from '@reduxjs/toolkit'

import { User } from '../../User/UserApi'
import { userLoggedIn, userLoggedOut } from '../Actions/UserActions'
import { AppSelector } from '../AppState'

export type CurrentUserState = User | null

export const CurrentUserReducer = createReducer<CurrentUserState>(null, ({ addCase }) => {
  addCase(userLoggedIn, (state, action) => action.payload.user)
  addCase(userLoggedOut, () => null)
})

export const selectCurrentUser: AppSelector<User | null> = (state) => state.currentUser
