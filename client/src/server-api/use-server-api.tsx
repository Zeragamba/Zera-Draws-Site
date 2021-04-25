import React, { Dispatch, FC, useEffect, useReducer } from 'react';

interface State<D> {
  fetching: boolean;
  data?: D;
  error?: Error;
}

interface ApiAction<D> {
  type: ApiActionTypes;
  fetching?: boolean;
  data?: D;
  error?: Error;
}

enum ApiActionTypes {
  FETCH = 'FETCH',
  SUCCESS = 'SUCCESS',
  FAILURE = 'FAILURE',
}

function apiReducer<D>(state: State<D>, action: ApiAction<D>): State<D> {
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

export function fetch<D>(dispatch: Dispatch<ApiAction<D>>, promise: Promise<D>): void {
  dispatch({ type: ApiActionTypes.FETCH });
  promise
    .then((data) => dispatch({ type: ApiActionTypes.SUCCESS, data }))
    .catch((error) => dispatch({ type: ApiActionTypes.FAILURE, error }));
}

export interface UseServerApiReturn<D> extends State<D> {
  LoadingGate: FC;
}

function useServerApi<D>(apiCallback: () => Promise<D>): UseServerApiReturn<D> {
  const [state, dispatch] = useReducer(apiReducer, { fetching: false } as State<D>);

  useEffect(() => fetch(dispatch, apiCallback()), [dispatch, apiCallback]);

  const LoadingGate: FC = ({
    children,
  }) => {
    if (state.fetching) {
      return <div>Loading...</div>;
    } else if (state.error) {
      return <div>ERROR: {state.error.toString()}</div>;
    } else {
      return <>{children}</>;
    }
  };

  return { ...state, LoadingGate } as UseServerApiReturn<D>;
}

export default useServerApi;
