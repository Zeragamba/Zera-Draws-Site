import React, { FC } from 'react'

import { ImageData } from './ImageData'
import { useImagePreloader } from './ImagePreloader'
import { GalleryItem } from '../Gallery/GalleryItem'
import { GalleryWrapper } from '../Gallery/GalleryWrapper'

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
