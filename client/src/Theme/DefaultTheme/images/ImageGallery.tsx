import React, { FC } from 'react'

import { useImagePreloader } from './ImagePreloader'
import { ImageData } from '../../../Lib'
import { GalleryItem } from '../Galleries/GalleryItem'
import { GalleryWrapper } from '../Galleries/GalleryWrapper'

interface ImageGalleryProps {
  images: ImageData[]
  rowHeight?: number
  onImageClick: (image: ImageData) => void
}

export const ImageGallery: FC<ImageGalleryProps> = ({
  onImageClick,
  rowHeight,
  images,
}) => {
  const preloadImage = useImagePreloader()

  images.map((image) => preloadImage({ image, size: 'high' }))

  return (
    <GalleryWrapper rowHeight={rowHeight}>
      {images.map((image) => (
        <GalleryItem key={image.id} image={image} released={true} onClick={() => onImageClick(image)} />
      ))}
    </GalleryWrapper>
  )
}
