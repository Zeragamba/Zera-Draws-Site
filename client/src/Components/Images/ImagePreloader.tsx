import { FC } from 'react'

import { useImagePreload } from './ImageApi/ImageQueries'
import { ImageData } from './ImageData'

interface PostPreloaderProps {
  image: ImageData
  size?: string
}

export const ImagePreloader: FC<PostPreloaderProps> = ({
  image,
  size = 'high',
}) => {
  const src = image.srcs[size] || image.srcs.full
  useImagePreload(src)
  return null
}
