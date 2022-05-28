import { createAction } from '@reduxjs/toolkit'

import { User, UserApi } from '../../User/UserApi'
import { AppThunk } from '../AppState'

export const login = (username: string, password: string): AppThunk<Promise<void>> => {
  return async (dispatch) => {
    const user = await UserApi.login(username, password)
    dispatch(userLoggedIn(user))
  }
}

export const userLoggedIn = createAction('user/loggedIn', (user: User | null) => {
  return { payload: { user } }
})

export const userLoggedOut = createAction('user/loggedOut')
