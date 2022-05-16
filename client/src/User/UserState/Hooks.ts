import { useAppDispatch, useAppState } from '../../App/AppProvider'
import { UserApi } from '../UserApi'
import { setUser } from './Actions'
import { UserState } from './UserState'

const useUserState = (): UserState => {
  const { user } = useAppState()
  return user
}


export type CurrentUserHook = [ user: UserState['user'], fetching: boolean ]
export const useCurrentUser = (): CurrentUserHook => {
  const { user, fetching } = useUserState()
  return [ user, fetching ]
}


type LoginHook = (username: string, password: string) => Promise<void>
export const useLogin = (): LoginHook => {
  const dispatch = useAppDispatch()

  return (username: string, password: string) => {
    return UserApi.login(username, password)
      .then(user => dispatch(setUser(user)))
  }
}


type LogoutHook = () => void
export const useLogout = (): LogoutHook => {
  const dispatch = useAppDispatch()
  return () => dispatch(setUser(null))
}
