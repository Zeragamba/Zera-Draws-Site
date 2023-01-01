import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

import { AdminLayout } from '../Layouts'
import { CreatePostForm } from './Forms/CreatePostForm'

export const NewPostPage: FC = () => {
  const navigate = useNavigate()

  return (
    <AdminLayout>
      <CreatePostForm onCreated={(post) => navigate(`/post/${post.slug}`)} />
    </AdminLayout>
  )
}
