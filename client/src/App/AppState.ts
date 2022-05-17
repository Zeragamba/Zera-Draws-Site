import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import { tagsReducer } from '../Tags/TagsState/TagsState'
import { userReducer } from '../User/UserState/UserState'


export const appStore = configureStore({
  reducer: {
    user: userReducer,
    tags: tagsReducer,
  },
})

export type AppState = ReturnType<typeof appStore.getState>
export type AppDispatch = typeof appStore.dispatch

export const useAppDispatch = (): AppDispatch => useDispatch()
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector
