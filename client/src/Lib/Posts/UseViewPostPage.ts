import { useNavigate, useParams } from 'react-router-dom'

import { PostData } from './PostData'
import { getPostUrl, usePost$ } from './PostsApi'
import { GalleryData, useGallery$ } from '../Gallery'
import { TagData, useTag$ } from '../Tags'

export type UseViewPostPageReturn = {
  isPending: boolean
  post?: PostData
  postId: string
  tag?: TagData
  tagId?: string
  gallery?: GalleryData
  galleryId?: string
  onPostChange: (post: PostData) => void
}

export function useViewPostPage(): UseViewPostPageReturn {
  const navigate = useNavigate()
  const { postId, tagId, galleryId } = useParams()
  if (!postId) throw new Error('no postId provided')

  const post$ = usePost$({ postId, tag: tagId, gallery: galleryId })
  const post = post$.data

  const tag$ = useTag$({ tagId })
  const tag = tag$.data

  const gallery$ = useGallery$({ galleryId })
  const gallery = gallery$.data

  const onPostChange = (post: PostData) => {
    return navigate(getPostUrl({ postId: post.slug, tagId, galleryId }))
  }

  return {
    isPending: post$.isPending,
    post,
    postId,
    tag,
    tagId,
    gallery,
    galleryId,
    onPostChange,
  }
}
