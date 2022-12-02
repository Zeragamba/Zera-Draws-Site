import { FC } from 'react'
import { Navigate, useParams } from 'react-router-dom'

import { EditPostForm } from '../../Components/Posts/Forms/EditPostForm'
import { AdminLayout } from '../../Layouts'

export const EditPostPage: FC = () => {
  const { postId } = useParams()

  if (!postId) {
    console.log('No Post ID')
    return <Navigate to={'/'} />
  }

  return (
    <AdminLayout>
      <EditPostForm postId={postId} />
    </AdminLayout>
  )
}
