import { createAction } from '@reduxjs/toolkit'

import { UserState } from './UserState'

export const userFetchStart = createAction('USER.FETCH.START')

export const userFetchComplete = createAction('USER.FETCH.COMPLETE', (user: UserState['user']) => {
  return { payload: user }
})

export const setUser = createAction('USER.SET', (user: UserState['user']) => {
  return { payload: user }
})
