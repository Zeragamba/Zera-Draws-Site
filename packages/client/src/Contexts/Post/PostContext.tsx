import { createContext } from "react"

import { GalleryData, PostData, TagData } from "../../Models"

export type PostContextState = {
  post: PostData
  tag?: TagData | null
  gallery?: GalleryData | null
  imageIndex: number
  setImageIndex: (index: number) => void
}

export const PostContext = createContext<null | PostContextState>(null)
