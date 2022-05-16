import { createContext, FC, ReactNode, useContext, useEffect, useReducer } from 'react'

import { ServerApi } from '../Lib/ServerApi'
import { TagsApi } from '../Tags/TagsApi'
import { tagsFetchComplete, tagsFetchStart } from '../Tags/TagsState/Actions'
import { UserApi } from '../User/UserApi'
import { userFetchComplete, userFetchStart } from '../User/UserState/Actions'
import { AppDispatch, appReducer, AppState, defaultAppState } from './AppState'


const AppContext = createContext(defaultAppState)

interface AppProviderProps {
  children: ReactNode
}

export const AppProvider: FC<AppProviderProps> = ({
  children,
}) => {
  const [ appState, dispatch ] = useReducer(appReducer, defaultAppState)

  useEffect(() => {
    if (!ServerApi.getToken()) return
    dispatch(userFetchStart())

    UserApi.getCurrent()
      .then(user => dispatch(userFetchComplete(user)))
  }, [])

  useEffect(() => {
    dispatch(tagsFetchStart())

    TagsApi.getTags()
      .then(tags => dispatch(tagsFetchComplete(tags)))
  }, [])

  return (
    <AppContext.Provider value={{ ...appState, dispatch }}> {children}</AppContext.Provider>
  )
}

export const useAppState = (): AppState => useContext(AppContext)
export const useAppDispatch = (): AppDispatch => useContext(AppContext).dispatch
