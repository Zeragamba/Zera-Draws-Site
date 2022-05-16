import { Dispatch, useEffect, useReducer } from 'react'

export interface UseApiState<D> {
  fetching: boolean
  data?: D
  error?: Error
}

interface ApiAction<D> {
  type: ApiActionTypes
  fetching?: boolean
  data?: D
  error?: Error
}

enum ApiActionTypes {
  FETCH = 'FETCH',
  SUCCESS = 'SUCCESS',
  FAILURE = 'FAILURE',
}

function apiReducer<D>(state: UseApiState<D>, action: ApiAction<D>): UseApiState<D> {
  switch (action.type) {
    case  ApiActionTypes.FETCH:
      return {
        ...state,
        fetching: true,
      }
    case ApiActionTypes.SUCCESS:
      return {
        ...state,
        fetching: false,
        data: action.data,
        error: undefined,
      }
    case ApiActionTypes.FAILURE:
      return {
        ...state,
        fetching: false,
        data: action.data,
        error: action.error,
      }
    default:
      throw new Error(`Unknown type ${action.type}`)
  }
}

export function fetch<D>(dispatch: Dispatch<ApiAction<D>>, promise: Promise<D>): void {
  dispatch({ type: ApiActionTypes.FETCH })
  promise
    .then((data) => dispatch({ type: ApiActionTypes.SUCCESS, data }))
    .catch((error) => dispatch({ type: ApiActionTypes.FAILURE, error }))
}

export function useServerApi<D>(apiCallback: () => Promise<D>): UseApiState<D> {
  const [state, dispatch] = useReducer(apiReducer, { fetching: false } as UseApiState<D>)
  useEffect(() => fetch(dispatch, apiCallback()), [dispatch, apiCallback])
  return state as UseApiState<D>
}

export function useApi<D>(apiCallback: () => Promise<D> | undefined, deps: unknown[] = []): UseApiState<D> {
  const [state, dispatch] = useReducer(apiReducer, { fetching: false } as UseApiState<D>)

  useEffect(() => {
    const promise = apiCallback()
    if (!promise) return
    fetch(dispatch, promise)
  }, [dispatch, ...deps])

  return state as UseApiState<D>
}

export default useServerApi
