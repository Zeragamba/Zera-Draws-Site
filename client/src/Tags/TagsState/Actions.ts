import { AppReducer } from '../../App/AppState'
import { TagsState } from './TagsState'

enum Actions {
  FETCH_START = 'TAGS.FETCH.START',
  FETCH_COMPLETE = 'TAGS.FETCH.COMPLETE',
}

export type TagsAction =
  | FetchStart
  | FetchComplete

type FetchStart = { type: Actions.FETCH_START }
export function tagsFetchStart(): FetchStart {
  return { type: Actions.FETCH_START }
}

type FetchComplete = { type: Actions.FETCH_COMPLETE; tags: TagsState['tags'] }
export function tagsFetchComplete(tags: TagsState['tags']): FetchComplete {
  return { type: Actions.FETCH_COMPLETE, tags }
}

export const tagsReducer: AppReducer<TagsState> = (state, action) => {
  switch (action.type) {
    case Actions.FETCH_START:
      return { ...state, fetching: true }
    case Actions.FETCH_COMPLETE:
      return { tags: action.tags, fetching: false }
    default:
      return state
  }
}
