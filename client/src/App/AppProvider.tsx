import { FC, ReactNode, useEffect } from 'react'
import { Provider } from 'react-redux'

import { ServerApi } from '../Lib/ServerApi'
import { TagsApi } from '../Tags/TagsApi'
import { tagsFetchComplete, tagsFetchStart } from '../Tags/TagsState/Actions'
import { UserApi } from '../User/UserApi'
import { userFetchComplete, userFetchStart } from '../User/UserState/Actions'
import { appStore } from './AppState'

interface AppProviderProps {
  children: ReactNode
}

export const AppProvider: FC<AppProviderProps> = ({
  children,
}) => {
  const dispatch = appStore.dispatch

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
    <Provider store={appStore}>{children}</Provider>
  )
}
