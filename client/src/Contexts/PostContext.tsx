import { createContext, FC, PropsWithChildren, ReactNode, useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { GalleryData, PostData, TagData } from '../Lib'
import { useOptionalGallery$, useOptionalTag$, usePost$ } from '../Queries'

type PostContextState = {
  post: PostData
  tag?: TagData | null
  gallery?: GalleryData | null
  imageIndex: number
  setImageIndex: (index: number) => void
}

const PostContext = createContext<null | PostContextState>(null)

export type PostProviderProps = PropsWithChildren<{
  renderPending: ReactNode
}>

export const PostProvider: FC<PostProviderProps> = ({
  renderPending,
  children,
}) => {
  const { postId, tagId, galleryId } = useParams()
  if (!postId) throw new Error('no postId provided')

  const post$ = usePost$({ postId, tagId, galleryId })
  const post = post$.data

  const tag$ = useOptionalTag$({ tagId })
  const tag = tag$.data

  const gallery$ = useOptionalGallery$({ galleryId })
  const gallery = gallery$.data

  const [ imageIndex, setImageIndex ] = useState<number>(0)
  useEffect(() => setImageIndex(0), [ post ])

  if (post$.isLoading) return renderPending
  if (!post) throw new Error('Post not found')

  return <PostContext.Provider
    value={{
      post,
      tag,
      gallery,
      imageIndex,
      setImageIndex,
    }}
    children={children}
  />
}

export const usePostContext = () => {
  const context = useContext(PostContext)
  if (!context) throw new Error('Not within a PostProvider')
  return context
}

export const usePost = () => usePostContext().post
export const useTag = () => usePostContext().tag
export const useGallery = () => usePostContext().gallery
export const usePostImageIndex = () => {
  const { imageIndex, setImageIndex } = usePostContext()
  return [ imageIndex, setImageIndex ]
}
