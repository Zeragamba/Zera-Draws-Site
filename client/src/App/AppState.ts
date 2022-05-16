import { noOp } from '../Lib/util'
import { TagsAction, tagsReducer } from '../Tags/TagsState/Actions'
import { defaultTagsState, TagsState } from '../Tags/TagsState/TagsState'
import { UserAction, userReducer } from '../User/UserState/Actions'
import { defaultUserState, UserState } from '../User/UserState/UserState'

export type AppDispatch = (action: AppAction) => void

export type AppState = {
  dispatch: AppDispatch
  user: UserState
  tags: TagsState
}

export type AppReducer<State> = (state: State, action: AppAction) => State

export const defaultAppState: AppState = {
  dispatch: noOp,
  user: defaultUserState,
  tags: defaultTagsState,
}

export type AppAction =
  | UserAction
  | TagsAction

export const appReducer: AppReducer<AppState> = (state, action) => {
  return {
    ...state,
    user: userReducer(state.user, action),
    tags: tagsReducer(state.tags, action),
  }
}
