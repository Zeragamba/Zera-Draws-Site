import { createContext } from "react"

import { TagData } from "../../Models"
import { PostData } from "./PostData"
import { GalleryData } from "../Galleries"

export type PostContextState = {
  post: PostData
  tag?: TagData | null
  gallery?: GalleryData | null
  imageIndex: number
  setImageIndex: (index: number) => void
}

export const PostContext = createContext<null | PostContextState>(null)
