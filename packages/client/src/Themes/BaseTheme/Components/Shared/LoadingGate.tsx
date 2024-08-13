import { FC, ReactNode } from "react"

interface LoadingGateProps {
  loading: boolean
  error?: Error | string
  children: ReactNode
}

export const LoadingGate: FC<LoadingGateProps> = ({
  loading,
  error,
  children,
}) => {
  if (loading) {
    return <div>Loading...</div>
  } else if (error) {
    return <div>ERROR: {error.toString()}</div>
  } else {
    return <>{children}</>
  }
}
