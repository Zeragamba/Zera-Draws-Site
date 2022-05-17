import { useAppDispatch, useAppSelector } from '../../App/AppState'
import { UserApi } from '../UserApi'
import { setUser } from './Actions'
import { UserState } from './UserState'

export type CurrentUserHook = [ user: UserState['user'], fetching: boolean ]
export const useCurrentUser = (): CurrentUserHook => {
  const { user, fetching } = useAppSelector(state => state.user)
  return [ user, fetching ]
}


type LoginHook = (username: string, password: string) => Promise<void>
export const useLogin = (): LoginHook => {
  const dispatch = useAppDispatch()

  return async (username: string, password: string) => {
    await UserApi.login(username, password)
      .then(user => dispatch(setUser(user)))
  }
}


type LogoutHook = () => void
export const useLogout = (): LogoutHook => {
  const dispatch = useAppDispatch()
  return () => dispatch(setUser(null))
}
