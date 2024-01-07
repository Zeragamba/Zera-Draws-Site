import { useNavigate, useParams } from 'react-router-dom'

import { PostData } from './PostData'
import { getPostUrl, usePost$ } from './PostsApi'

export type UseViewPostPageReturn = {
  isPending: boolean
  post?: PostData
  tagId?: string
  galleryId?: string
  onPostChange: (post: PostData) => void
}

export function useViewPostPage(): UseViewPostPageReturn {
  const navigate = useNavigate()
  const { postId, tagId, galleryId } = useParams()

  const post$ = usePost$({ postId: postId as string, tag: tagId, gallery: galleryId })
  const post = post$.data

  const onPostChange = (post: PostData) => {
    return navigate(getPostUrl({ postId: post.slug, tagId, galleryId }))
  }

  return {
    post,
    isPending: post$.isPending,
    tagId,
    galleryId,
    onPostChange,
  }
}