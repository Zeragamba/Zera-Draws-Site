import { createContext, FC, ReactNode, useContext, useRef } from 'react'

import { useInViewport } from '../../Lib/InViewport'

export type GalleryConfig = {
  rowHeight: number
}

interface GalleryContextState extends GalleryConfig {
  galleryInView: boolean
}

const GalleryContext = createContext<GalleryContextState>({
  galleryInView: true,
  rowHeight: 250,
})

export const useGalleryContext = (): GalleryContextState => {
  return useContext(GalleryContext)
}

interface GalleryContextProviderProps {
  config: GalleryConfig
  children: ReactNode
}

export const GalleryContextProvider: FC<GalleryContextProviderProps> = ({ config, children }) => {
  const galleryRef = useRef<HTMLDivElement>(null)
  const galleryInView = useInViewport(galleryRef)

  return (
    <GalleryContext.Provider value={{ ...config, galleryInView }}>
      <div ref={galleryRef}>
        {children}
      </div>
    </GalleryContext.Provider>
  )
}
