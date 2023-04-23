import { FC } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'

import { EditPostForm } from './Forms/EditPostForm'
import { AdminLayout } from '../Admin/AdminLayout'

export const EditPostPage: FC = () => {
  const navigate = useNavigate()
  const { postId } = useParams()

  if (!postId) {
    return <Navigate to={'/'} replace />
  }

  const onCancel = () => {
    if (history.length > 1) {
      navigate(-1)
    } else {
      navigate(`/post/${postId}`)
    }
  }

  return (
    <AdminLayout>
      <EditPostForm
        postId={postId}
        onUpdated={(post) => navigate(`/post/${post.slug}`)}
        onCancel={onCancel}
        onDeleted={() => navigate('/archive')}
      />
    </AdminLayout>
  )
}
