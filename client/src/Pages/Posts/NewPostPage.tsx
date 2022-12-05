import { FC } from 'react'

import { AdminLayout } from '../../Components/Layouts'
import { CreatePostForm } from '../../Components/Posts/Forms/CreatePostForm'

export const NewPostPage: FC = () => {
  return (
    <AdminLayout>
      <CreatePostForm />
    </AdminLayout>
  )
}
