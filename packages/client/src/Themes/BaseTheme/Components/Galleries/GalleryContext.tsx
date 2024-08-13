import { createContext, FC, ReactNode, useContext } from 'react'

export type GalleryConfig = {
  rowHeight: number
  numRows?: number
  tagSlug?: string
  gallerySlug?: string
}

export const defaultGalleryConfig: GalleryConfig = {
  rowHeight: 250,
}

const GalleryContext = createContext<GalleryConfig>(defaultGalleryConfig)

export const useGalleryContext = (): GalleryConfig => {
  return useContext(GalleryContext)
}

interface GalleryContextProviderProps {
  config: Partial<GalleryConfig>
  children: ReactNode
}

export const GalleryContextProvider: FC<GalleryContextProviderProps> = ({
  config,
  children,
}) => {
  return (
    <GalleryContext.Provider value={{ ...defaultGalleryConfig, ...config }}>
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <div style={{ '--gallery-height': config.rowHeight + 'px' } as any}>
        {children}
      </div>
    </GalleryContext.Provider>
  )
}
