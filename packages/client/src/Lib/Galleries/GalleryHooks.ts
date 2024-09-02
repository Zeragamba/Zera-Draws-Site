import { useContext } from "react"
import { GalleryConfig, GalleryContext } from "./GalleryContext.ts"

export const useGalleryContext = (): GalleryConfig => {
  return useContext(GalleryContext)
}
