import { FC } from 'react'
import { Navigate, useParams } from 'react-router-dom'

import { ViewPost } from '../../Components/Posts/ViewPost/ViewPost'
import { PublicLayout } from '../../Layouts'

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
