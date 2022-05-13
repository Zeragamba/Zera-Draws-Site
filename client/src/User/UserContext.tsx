import { createContext, FC, ReactNode, useContext, useEffect, useState } from 'react'

import { ServerApi } from '../Lib/ServerApi'
import { noOp, Setter } from '../Lib/util'
import { User, UserApi } from './UserApi'

type UserState = {
  user: User | null
  fetching: boolean
  setUser: Setter<UserState['user']>
}

const UserContext = createContext<UserState>({
  user: null,
  fetching: false,
  setUser: noOp,
})

interface UserProviderProps {
  children: ReactNode
}

export const UserProvider: FC<UserProviderProps> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<UserState['user']>(null)
  const [fetching, setFetching] = useState<boolean>(false)

  useEffect(() => {
    if (!ServerApi.getToken()) return
    setFetching(true)

    UserApi.getCurrent()
      .then(user => setCurrentUser(user))
      .catch(noOp)
      .then(() => setFetching(false))
  }, [])

  const state: UserState = { user: currentUser, setUser: setCurrentUser, fetching }
  return (<UserContext.Provider value={state}>{children}</UserContext.Provider>)
}

export type CurrentUserHook = [
  user: UserState['user'],
  fetching: boolean
]

export const useCurrentUser = (): CurrentUserHook => {
  const { user, fetching } = useContext(UserContext)
  return [user, fetching]
}

type LoginHook = (username: string, password: string) => Promise<void>

export const useLogin = (): LoginHook => {
  const { setUser } = useContext(UserContext)

  return (username: string, password: string) => {
    return UserApi.login(username, password)
      .then(user => setUser(user))
  }
}

type LogoutHook = () => void
export const useLogout = (): LogoutHook => {
  const { setUser } = useContext(UserContext)
  return () => setUser(null)
}
