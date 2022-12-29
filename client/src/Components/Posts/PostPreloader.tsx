import React, { FC } from 'react'

import { Post } from './Post'
import { usePost } from './PostsApi'

interface PostPreloaderProps {
  postId: Post['id']
  preloadSize?: string
}

export const PostPreloader: FC<PostPreloaderProps> = ({
  postId,
  preloadSize = 'high',
}) => {
  const { data: post } = usePost({ postId })
  if (!post) return null

  const imgSrcs = post.images.map((image) => image.srcs[preloadSize])

  return (
    <>
      {imgSrcs.map((src) => (
        <img key={src} style={{ display: 'none' }} src={src} />
      ))}
    </>
  )
}
