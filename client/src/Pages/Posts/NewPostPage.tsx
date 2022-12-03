import { FC } from 'react'

import { CreatePostForm } from '../../Components/Posts/Forms/CreatePostForm'
import { AdminLayout } from '../../Layouts'

export const NewPostPage: FC = () => {
  return (
    <AdminLayout>
      <CreatePostForm />
    </AdminLayout>
  )
}
