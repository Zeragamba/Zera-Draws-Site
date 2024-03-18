import { useNavigate, useParams } from 'react-router-dom'

import { PostData } from './PostData'
import { getPostUrl } from './PostUtil'
import { useOptionalGallery$, useOptionalTag$, usePost$ } from '../../Queries'
import { GalleryData } from '../Gallery'
import { TagData } from '../Tags'

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

  const post$ = usePost$({ postId, tagId, galleryId })
  const post = post$.data

  const tag$ = useOptionalTag$({ tagId })
  const tag = tag$.data || undefined

  const gallery$ = useOptionalGallery$({ galleryId })
  const gallery = gallery$.data || undefined

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
