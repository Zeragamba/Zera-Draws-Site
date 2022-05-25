import { ServerApi } from '../Lib/ServerApi'
import { TagsApi } from '../Tags/TagsApi'
import { UserApi } from '../User/UserApi'
import { setTags, tagsFetchComplete, tagsFetchError, tagsFetchStart } from './Actions/TagActions'
import { setUser, userFetchComplete, userFetchError, userFetchStart } from './Actions/UserActions'
import { AppThunk } from './AppState'

export const applicationStart = (): AppThunk => {
  return (dispatch) => {
    if (ServerApi.getToken()) {
      dispatch(userFetchStart())
      UserApi.getCurrent()
        .then(user => dispatch(setUser(user)))
        .then(() => dispatch(userFetchComplete()))
        .catch(error => dispatch(userFetchError(error)))
    }

    dispatch(tagsFetchStart())
    TagsApi.getTags()
      .then(tags => dispatch(setTags(tags)))
      .then(() => dispatch(tagsFetchComplete()))
      .catch(error => dispatch(tagsFetchError(error)))
  }
}
