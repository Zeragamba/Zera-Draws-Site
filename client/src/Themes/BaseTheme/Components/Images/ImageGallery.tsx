import React, { FC } from 'react'

import { ImageData } from '../../../../Models'
import { useImagePreloader } from '../../../../Queries'
import { GalleryItem, GalleryWrapper } from '../Galleries'

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
