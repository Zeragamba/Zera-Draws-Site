import { createContext, FC, PropsWithChildren, ReactNode, useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { GalleryData, PostData, TagData } from '../Models'
import { useLatestPost$, useOptionalGallery$, useOptionalTag$, usePost$ } from '../Queries'

export type PostContextState = {
  post: PostData
  tag?: TagData | null
  gallery?: GalleryData | null
  imageIndex: number
  setImageIndex: (index: number) => void
}

const PostContext = createContext<null | PostContextState>(null)

export type PostProviderProps = PropsWithChildren<{
  post: PostData
  tag?: TagData | null
  gallery?: GalleryData | null
}>

export const PostProvider: FC<PostProviderProps> = ({
  post,
  tag,
  gallery,
  children,
}) => {
  const [ imageIndex, setImageIndex ] = useState<number>(0)
  useEffect(() => setImageIndex(0), [ post ])

  return <PostContext.Provider
    value={{ post, tag, gallery, imageIndex, setImageIndex }}
    children={children}
  />
}

export type ParamsPostProviderProps = PropsWithChildren<{
  renderPending: ReactNode
}>

export const ParamsPostProvider: FC<ParamsPostProviderProps> = ({
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

  if (post$.isLoading) return renderPending
  if (!post) throw new Error('Post not found')

  return <PostProvider
    post={post}
    tag={tag}
    gallery={gallery}
    children={children}
  />
}
export type LatestPostProviderProps = PropsWithChildren<{
  renderPending: ReactNode
}>

export const LatestPostProvider: FC<LatestPostProviderProps> = ({
  renderPending,
  children,
}) => {
  const latestPost$ = useLatestPost$()
  const latestPost = latestPost$.data

  if (latestPost$.isPending) return renderPending
  if (!latestPost) throw new Error('No latest post found')

  return <PostProvider post={latestPost} children={children} />
}

export const usePostContext = () => {
  const context = useContext(PostContext)
  if (!context) throw new Error('Not within a PostProvider')
  return context
}
