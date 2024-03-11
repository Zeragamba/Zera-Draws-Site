import { createContext, useContext } from 'react'

import { PostData } from './PostData'
import { GalleryData } from '../Gallery'
import { TagData } from '../Tags'

export type PostContextState = {
  post: PostData
  tag: TagData | null
  gallery: GalleryData | null
}

export const PostContext = createContext<PostContextState | null>(null)

export const usePostContext = () => {
  const state = useContext(PostContext)
  if (!state) throw new Error('No current post context provided')
  return state
}

export const usePost = () => usePostContext().post
export const useTag = () => usePostContext().tag
export const useGallery = () => usePostContext().gallery
