import { AppAction } from '../../App/AppState'
import { UserState } from './UserState'


enum Actions {
  FETCH_START = 'USER.FETCH.START',
  FETCH_COMPLETE = 'USER.FETCH.COMPLETE',
  SET_USER = 'USER.SET',
}

export type UserAction =
  | FetchStart
  | FetchComplete
  | SetUser

type FetchStart = { type: Actions.FETCH_START }
export function userFetchStart(): FetchStart {
  return { type: Actions.FETCH_START }
}

type FetchComplete = { type: Actions.FETCH_COMPLETE; user: UserState['user'] }
export function userFetchComplete(user: UserState['user']): FetchComplete {
  return { type: Actions.FETCH_COMPLETE, user }
}

type SetUser = { type: Actions.SET_USER; user: UserState['user'] }
export function setUser(user: UserState['user']): SetUser {
  return { type: Actions.SET_USER, user }
}

export const userReducer = (state: UserState, action: AppAction): UserState => {
  switch (action.type) {
    case Actions.FETCH_START:
      return { ...state, fetching: true }
    case Actions.FETCH_COMPLETE:
      return { ...state, user: action.user, fetching: false }
    case Actions.SET_USER:
      return { ...state, user: action.user }
    default:
      return state
  }
}
