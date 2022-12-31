import { createContext, FC, ReactNode, useContext } from 'react'

export type GalleryConfig = {
  rowHeight: number
  tagSlug?: string
  gallerySlug?: string
}

const GalleryContext = createContext<GalleryConfig>({
  rowHeight: 250,
})

export const useGalleryContext = (): GalleryConfig => {
  return useContext(GalleryContext)
}

interface GalleryContextProviderProps {
  config: GalleryConfig
  children: ReactNode
}

export const GalleryContextProvider: FC<GalleryContextProviderProps> = ({ config, children }) => {
  return (
    <GalleryContext.Provider value={config}>
      {children}
    </GalleryContext.Provider>
  )
}
