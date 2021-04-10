import React, {useEffect, useReducer} from 'react';

const ApiActionTypes = {
  FETCH: 'FETCH',
  SUCCESS: 'SUCCESS',
  FAILURE: 'FAILURE',
};

function apiReducer(state, action) {
  switch (action.type) {
    case  ApiActionTypes.FETCH:
      return {
        ...state,
        fetching: true,
      };
    case ApiActionTypes.SUCCESS:
      return {
        ...state,
        fetching: false,
        data: action.data,
        error: undefined,
      };
    case ApiActionTypes.FAILURE:
      return {
        ...state,
        fetching: false,
        data: action.data,
        error: action.error,
      };
    default:
      throw new Error(`Unknown type ${action.type}`);
  }
}

export const fetch = (dispatch, promise) => {
  dispatch({type: ApiActionTypes.FETCH});
  promise
    .then((data) => dispatch({type: ApiActionTypes.SUCCESS, data}))
    .catch((error) => dispatch({type: ApiActionTypes.FAILURE, error}));
}

function useServerApi(apiCallback) {
  const [state, dispatch] = useReducer(apiReducer, {fetching: true, error: undefined, data: undefined});

  useEffect(() => fetch(dispatch, apiCallback()), [dispatch, apiCallback]);

  const LoadingGate = ({children}) => {
    if (state.fetching) {
      return <div>Loading...</div>;
    } else if (state.error) {
      return <div>ERROR: {state.error}</div>;
    } else {
      return children;
    }
  }

  return {...state, LoadingGate};
}

export default useServerApi;
