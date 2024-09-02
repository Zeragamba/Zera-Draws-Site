import { useContext } from "react"
import { GalleryConfig, GalleryContext } from "./GalleryContext"

export const useGalleryContext = (): GalleryConfig => {
  return useContext(GalleryContext)
}
