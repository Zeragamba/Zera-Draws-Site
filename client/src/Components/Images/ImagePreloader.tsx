import React, { FC } from 'react'

import { Image } from './Image'

interface PostPreloaderProps {
  image: Image
  size?: string
}

export const ImagePreloader: FC<PostPreloaderProps> = ({
  image,
  size = 'high',
}) => {
  const src = image.srcs[size] || image.srcs.full
  return <img style={{ display: 'none' }} src={src} />
}
