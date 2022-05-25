import { createAction } from '@reduxjs/toolkit'

import { User, UserApi } from '../../User/UserApi'
import { AppThunk } from '../AppState'
import { UserState } from '../Reducers/UserReducer'

export const login = (username: string, password: string): AppThunk<Promise<User>> => {
  return async (dispatch) => {
    try {
      dispatch(userFetchStart())
      const user = await UserApi.login(username, password)
      dispatch(userFetchComplete())

      dispatch(setUser(user))

      return user
    } catch (error) {
      dispatch(userFetchError(error))
      throw error
    }
  }
}

export const logout = (): ReturnType<typeof setUser> => setUser(null)

export const userFetchStart = createAction('USER.FETCH.START')

export const userFetchComplete = createAction('USER.FETCH.COMPLETE')

export const userFetchError = createAction('USER.FETCH.ERROR', (error: unknown) => {
  return { payload: { error } }
})

export const setUser = createAction('USER.SET', (user: UserState['currentUser']) => {
  return { payload: user }
})
