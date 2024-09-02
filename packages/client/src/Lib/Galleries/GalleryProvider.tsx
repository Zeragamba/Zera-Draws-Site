import { FC, ReactNode } from "react"
import {
  defaultGalleryConfig,
  GalleryConfig,
  GalleryContext,
} from "./GalleryContext.ts"

export interface GalleryContextProviderProps {
  config: Partial<GalleryConfig>
  children: ReactNode
}

export const GalleryProvider: FC<GalleryContextProviderProps> = ({
  config,
  children,
}) => {
  return (
    <GalleryContext.Provider value={{ ...defaultGalleryConfig, ...config }}>
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <div style={{ "--gallery-height": config.rowHeight + "px" } as any}>
        {children}
      </div>
    </GalleryContext.Provider>
  )
}
