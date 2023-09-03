import { createContext, FC, ReactNode, useContext } from 'react'

import { noop } from './Noop'

type ErrorHandler = (error: unknown) => void

const ErrorHandlerContext = createContext<ErrorHandler>(noop)

interface ErrorHandlerProviderProps {
  children: ReactNode
}

export const ErrorHandlerProvider: FC<ErrorHandlerProviderProps> = ({
  children,
}) => {
  const errorHandler: ErrorHandler = (error) => {
    console.error(error)
  }

  return (
    <ErrorHandlerContext.Provider value={errorHandler}>
      {children}
    </ErrorHandlerContext.Provider>
  )
}

export const useErrorHandler = (): ErrorHandler => {
  return useContext(ErrorHandlerContext)
}
