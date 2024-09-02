import { createContext } from "react"

import { PostData } from "./PostData"
import { GalleryData } from "../Galleries"
import { TagData } from "../Tags"

export type PostContextState = {
  post: PostData
  tag?: TagData | null
  gallery?: GalleryData | null
  imageIndex: number
  setImageIndex: (index: number) => void
}

export const PostContext = createContext<null | PostContextState>(null)
