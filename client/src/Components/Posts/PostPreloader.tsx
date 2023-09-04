import React, { FC } from 'react'

import { PostData } from './PostData'
import { usePost$ } from './PostsApi'
import { ImagePreloader } from '../Images/ImagePreloader'

interface PostPreloaderProps {
  postId: PostData['id']
  imageSize?: string
}

export const PostPreloader: FC<PostPreloaderProps> = ({
  postId,
  imageSize = 'high',
}) => {
  const { data: post } = usePost$({ postId })
  if (!post) return null

  return (
    <>
      {post.images.map((image) => (
        <ImagePreloader key={image.id} image={image} size={imageSize} />
      ))}
    </>
  )
}
