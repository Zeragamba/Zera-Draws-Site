import { FC } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'

import { PostData } from './PostData'
import { getPostUrl } from './PostsApi'
import { ViewPost } from './ViewPost/ViewPost'
import { PublicLayout } from '../Layouts'

export const ViewPostPage: FC = () => {
  const { postId, tagId, galleryId } = useParams()
  const navigate = useNavigate()

  if (!postId) {
    return <Navigate to={'/'} />
  }

  const onPostChange = (post: PostData) => {
    return navigate(getPostUrl({ postId: post.slug, tagId, galleryId }))
  }

  return (
    <PublicLayout thinHeader tagId={tagId} galleryId={galleryId}>
      <ViewPost postId={postId} onPostChange={onPostChange} />
    </PublicLayout>
  )
}
