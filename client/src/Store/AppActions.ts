import { ServerApi } from '../Lib/ServerApi'
import { UserApi } from '../User/UserApi'
import { userLoggedIn } from './Actions/UserActions'
import { AppThunk } from './AppState'

export const applicationStart = (): AppThunk => {
  return (dispatch) => {
    if (ServerApi.getToken()) {
      UserApi.getCurrent()
        .then(user => dispatch(userLoggedIn(user)))
    }
  }
}
