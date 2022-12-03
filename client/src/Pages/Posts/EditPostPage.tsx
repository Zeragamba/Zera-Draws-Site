import { FC } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'

import { EditPostForm } from '../../Components/Posts/Forms/EditPostForm'
import { AdminLayout } from '../../Layouts'

export const EditPostPage: FC = () => {
  const navigate = useNavigate()
  const { postId } = useParams()

  if (!postId) {
    console.log('No Post ID')
    return <Navigate to={'/'} />
  }

  return (
    <AdminLayout>
      <EditPostForm postId={postId} onUpdated={(post) => navigate(`/post/${post.slug}`)} />
    </AdminLayout>
  )
}
