import { createContext } from "react"

import { PostData, TagData } from "../../Models"
import { GalleryData } from "../../Lib"

export type PostContextState = {
  post: PostData
  tag?: TagData | null
  gallery?: GalleryData | null
  imageIndex: number
  setImageIndex: (index: number) => void
}

export const PostContext = createContext<null | PostContextState>(null)
