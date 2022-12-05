import { FC } from 'react'
import { Navigate, useParams } from 'react-router-dom'

import { PublicLayout } from '../../Components/Layouts'
import { ViewPost } from '../../Components/Posts/ViewPost/ViewPost'

export const ViewPostPage: FC = () => {
  const { postId } = useParams()

  if (!postId) {
    return <Navigate to={'/'} />
  }

  return (
    <PublicLayout>
      <ViewPost postId={postId} />
    </PublicLayout>
  )
}
