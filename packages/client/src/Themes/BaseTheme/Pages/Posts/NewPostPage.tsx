import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

import { CreatePostForm } from '../../Components/Posts/Forms/CreatePostForm'


export const NewPostPage: FC = () => {
  const navigate = useNavigate()

  return (
    <CreatePostForm onCreated={(post) => navigate(`/post/${post.slug}`)} />
  )
}
