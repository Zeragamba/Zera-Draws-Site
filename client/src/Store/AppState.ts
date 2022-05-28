import { AnyAction, configureStore, ThunkAction } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import { applicationStart } from './AppActions'
import { CurrentUserReducer } from './Reducers/CurrentUserReducer'
import { TagsReducer } from './Reducers/TagsReducer'


export const appStore = configureStore({
  reducer: {
    currentUser: CurrentUserReducer,
    tags: TagsReducer,
  },
})

export type AppState = ReturnType<typeof appStore.getState>
export type AppDispatch = typeof appStore.dispatch
export type AppThunk<T = unknown> = ThunkAction<T, AppState, undefined, AnyAction>
export type AppSelector<T> = (state: AppState) => T

export const useAppDispatch = (): AppDispatch => useDispatch()
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector

appStore.dispatch(applicationStart())
