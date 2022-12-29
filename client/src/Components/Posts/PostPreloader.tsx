import React, { FC } from 'react'

import { ImagePreloader } from '../Images/ImagePreloader'
import { Post } from './Post'
import { usePost } from './PostsApi'

interface PostPreloaderProps {
  postId: Post['id']
  imageSize?: string
}

export const PostPreloader: FC<PostPreloaderProps> = ({
  postId,
  imageSize = 'high',
}) => {
  const { data: post } = usePost({ postId })
  if (!post) return null

  return (
    <>
      {post.images.map((image) => (
        <ImagePreloader key={image.id} image={image} size={imageSize} />
      ))}
    </>
  )
}
