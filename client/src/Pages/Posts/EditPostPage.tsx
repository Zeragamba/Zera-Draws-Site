import { FC } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'

import { AdminLayout } from '../../Components/Layouts'
import { EditPostForm } from '../../Components/Posts/Forms/EditPostForm'

export const EditPostPage: FC = () => {
  const navigate = useNavigate()
  const { postId } = useParams()

  if (!postId) {
    return <Navigate to={'/'} />
  }

  return (
    <AdminLayout>
      <EditPostForm postId={postId} onUpdated={(post) => navigate(`/post/${post.slug}`)} />
    </AdminLayout>
  )
}
