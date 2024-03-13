import { createContext, FC, PropsWithChildren, useContext, useState } from 'react'

import { PostData } from './PostData'
import { GalleryData } from '../Gallery'
import { TagData } from '../Tags'


export type PostContextState = {
  post: PostData
  imageIndex: number
  setImageIndex: (index: number) => void
  tag: TagData | null
  gallery: GalleryData | null
}

export const PostContext = createContext<PostContextState | null>(null)

export type PostProviderProps = PropsWithChildren<{
  post: PostData
  tag?: TagData | null
  gallery?: GalleryData | null
}>

export const PostProvider: FC<PostProviderProps> = ({
  post,
  tag = null,
  gallery = null,
  children,
}) => {
  const [ imageIndex, setImageIndex ] = useState<number>(0)
  const state: PostContextState = {
    post,
    tag,
    gallery,
    imageIndex,
    setImageIndex,
  }

  return <PostContext.Provider value={state} children={children} />
}

export const usePostContext = () => {
  const state = useContext(PostContext)
  if (!state) throw new Error('No current post context provided')
  return state
}

export const usePost = () => usePostContext().post
export const useTag = () => usePostContext().tag
export const useGallery = () => usePostContext().gallery
export const usePostImageIndex = () => {
  const { imageIndex, setImageIndex } = usePostContext()
  return [ imageIndex, setImageIndex ]
}
