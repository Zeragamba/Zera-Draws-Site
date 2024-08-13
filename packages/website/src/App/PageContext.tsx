import { createContext, FC, ReactNode, useContext } from 'react'

type PageContextState = {
  tagId?: string
  galleryId?: string
}

const PageContext = createContext<PageContextState>({})


interface PageProviderProps extends PageContextState {
  children: ReactNode
}

export const PageContextProvider: FC<PageProviderProps> = ({
  children,
  ...contextProps
}) => {
  return (
    <PageContext.Provider value={contextProps}>{children}</PageContext.Provider>
  )
}

export const usePageContext = () => useContext(PageContext)
