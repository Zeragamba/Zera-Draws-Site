import { createContext, FC, ReactNode, useContext, useEffect, useState } from 'react'

import { noOp, Setter } from '../Lib/util'

type User = {
  loggedIn: boolean
  admin: boolean
}

const defaultUser: User = {
  loggedIn: false,
  admin: false,
}

type UserState = {
  user: User
  setUser: Setter<User>
}

const UserContext = createContext<UserState>({
  user: defaultUser,
  setUser: noOp,
})

interface UserProviderProps {
  children: ReactNode
}

export const UserProvider: FC<UserProviderProps> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState(defaultUser)

  useEffect(() => {
    const sessionUser = JSON.parse(sessionStorage.getItem('currentUser') || 'null')
    if (!sessionUser) return
    setCurrentUser(sessionUser)
  }, [])

  const state: UserState = { user: currentUser, setUser: setCurrentUser }
  return (<UserContext.Provider value={state}>{children}</UserContext.Provider>)
}

export const useCurrentUser = (): User => {
  return useContext(UserContext).user
}

export const useLogin = (): Setter<User> => {
  return useContext(UserContext).setUser
}
