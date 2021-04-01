import {useEffect, useReducer} from 'react'

const ApiActionTypes = {
  FETCH: 'FETCH',
  SUCCESS: 'SUCCESS',
  FAILURE: 'FAILURE',
}

function apiReducer(state, action) {
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
        error: null,
      }
    case ApiActionTypes.FAILURE:
      return {
        ...state,
        fetching: false,
        data: null,
        error: action.error,
      }
  }
}

function useServerApi(apiPromise, defaultData) {
  const [state, dispatch] = useReducer(apiReducer, {
    fetching: false,
    error: null,
    data: defaultData,
  });

  useEffect(() => {
    dispatch({type: ApiActionTypes.FETCH});
    apiPromise
      .then((data) => dispatch({type: ApiActionTypes.SUCCESS, data}))
      .catch((error) => dispatch({type: ApiActionTypes.FAILURE, error, data: defaultData}));
  }, [apiPromise])

  return state
}

export default useServerApi
