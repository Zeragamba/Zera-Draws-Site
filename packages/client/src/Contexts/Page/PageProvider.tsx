import { FC, ReactNode } from "react"
import { PageContext, PageContextState } from "./PageContext"

interface PageProviderProps extends PageContextState {
  children: ReactNode
}

export const PageProvider: FC<PageProviderProps> = ({
  children,
  ...contextProps
}) => {
  return (
    <PageContext.Provider value={contextProps}>{children}</PageContext.Provider>
  )
}
