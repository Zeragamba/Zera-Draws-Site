import { Alert, LinearProgress } from "@mui/material"
import { UseQueryResult } from "@tanstack/react-query"
import { ReactElement, ReactNode } from "react"

interface QueryGateProps<Data, Error = unknown> {
  query: UseQueryResult<Data, Error>
  renderPending?: () => ReactNode
  renderError?: (error: Error) => ReactNode
  renderData?: (data: Data) => ReactNode
}

export const QueryGate = <Data, Error = unknown>(
  props: QueryGateProps<Data, Error>,
): ReactElement | null => {
  const {
    query,
    renderPending = () => <LinearProgress />,
    renderError = (error) => <Alert color={"error"}>{String(error)}</Alert>,
    renderData = () => null,
  } = props

  switch (query.status) {
    case "pending":
      return <>{renderPending()}</>
    case "error":
      return <>{renderError(query.error)}</>
    case "success":
      return <>{renderData(query.data)}</>
  }
}
