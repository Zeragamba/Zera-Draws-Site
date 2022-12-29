import { FC } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'

import { PublicLayout } from '../../Components/Layouts'
import { Post } from '../../Components/Posts/Post'
import { ViewPost } from '../../Components/Posts/ViewPost/ViewPost'

export const ViewPostPage: FC = () => {
  const { postId } = useParams()
  const navigate = useNavigate()

  if (!postId) {
    return <Navigate to={'/'} />
  }

  const onPostChange = (post: Post) => {
    navigate(`/post/${post.slug}`)
  }

  return (
    <PublicLayout>
      <ViewPost postId={postId} onPostChange={onPostChange} />
    </PublicLayout>
  )
}
