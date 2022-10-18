import { FC } from 'react'
import { Navigate, useParams } from 'react-router-dom'

import { EditPost } from '../../Components/Posts/EditPost'
import { AdminLayout } from '../../Layouts'

export const EditPostPage: FC = () => {
  const { postId } = useParams()

  if (!postId) {
    console.log('No Post ID')
    return <Navigate to={'/'} />
  }

  return (
    <AdminLayout>
      <EditPost postId={postId} />
    </AdminLayout>
  )
}
