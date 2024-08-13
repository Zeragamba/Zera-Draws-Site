import { createContext } from "react"

export type PageContextState = {
  tagId?: string
  galleryId?: string
}

export const PageContext = createContext<PageContextState>({})
