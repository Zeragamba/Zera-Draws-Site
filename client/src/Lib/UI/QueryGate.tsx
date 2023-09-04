import { Alert, LinearProgress } from '@mui/material'
import { UseQueryResult } from '@tanstack/react-query'
import React, { ReactElement, ReactNode } from 'react'

interface QueryGateProps<Data, Error = unknown> {
  query: UseQueryResult<Data, Error>
  renderLoading?: () => ReactNode
  renderError?: (error: Error) => ReactNode
  renderData?: (data: Data) => ReactNode
}

export const QueryGate = <Data, Error = unknown>(props: QueryGateProps<Data, Error>): ReactElement | null => {
  const {
    query,
    renderLoading = () => <LinearProgress />,
    renderError = (error) => <Alert color={'error'}>{String(error)}</Alert>,
    renderData = () => null,
  } = props

  switch (query.status) {
    case 'loading':
      return <>{renderLoading()}</>
    case 'error':
      return <>{renderError(query.error)}</>
    case 'success':
      return <>{renderData(query.data)}</>
  }
}
