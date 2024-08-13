import { createContext } from "react"

export type GalleryConfig = {
  rowHeight: number
  numRows?: number
  tagSlug?: string
  gallerySlug?: string
}

export const defaultGalleryConfig: GalleryConfig = {
  rowHeight: 250,
}

export const GalleryContext = createContext<GalleryConfig>(defaultGalleryConfig)
