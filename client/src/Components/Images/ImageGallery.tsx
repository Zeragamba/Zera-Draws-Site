import React, { FC } from 'react'

import { GalleryItem } from '../Gallery/GalleryItem'
import { GalleryWrapper } from '../Gallery/GalleryWrapper'
import { Image } from './Image'
import { ImagePreloader } from './ImagePreloader'

interface ImageGalleryProps {
  images: Image[]
  onImageClick: (image: Image) => void
}

export const ImageGallery: FC<ImageGalleryProps> = ({
  onImageClick,
  images,
}) => {
  return (
    <GalleryWrapper>
      {images.map((image) => (
        <React.Fragment key={image.id}>
          <GalleryItem image={image} released={true} onClick={() => onImageClick(image)} />
          <ImagePreloader image={image} size="high" />
        </React.Fragment>
      ))}
    </GalleryWrapper>
  )
}
