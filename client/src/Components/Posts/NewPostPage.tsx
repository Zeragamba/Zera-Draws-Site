import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

import { CreatePostForm } from './Forms/CreatePostForm'
import { AdminLayout } from '../Admin/AdminLayout'

export const NewPostPage: FC = () => {
  const navigate = useNavigate()

  return (
    <AdminLayout>
      <CreatePostForm onCreated={(post) => navigate(`/post/${post.slug}`)} />
    </AdminLayout>
  )
}
