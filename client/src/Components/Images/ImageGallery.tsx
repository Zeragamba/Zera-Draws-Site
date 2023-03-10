import React, { FC } from 'react'

import { ImageData } from './ImageData'
import { ImagePreloader } from './ImagePreloader'
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
  return (
    <GalleryWrapper rowHeight={rowHeight}>
      {images.map((image) => (
        <React.Fragment key={image.id}>
          <GalleryItem image={image} released={true} onClick={() => onImageClick(image)} />
          <ImagePreloader image={image} size="high" />
        </React.Fragment>
      ))}
    </GalleryWrapper>
  )
}
