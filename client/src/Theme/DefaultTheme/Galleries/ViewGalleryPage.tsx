import { FC } from 'react'
import { Navigate, useParams } from 'react-router-dom'

import { GalleryPostsGallery } from './GalleryPostsGallery'

export const ViewGalleryPage: FC = () => {
  const params = useParams()
  if (!params.galleryId) return <Navigate to="/" />

  return (
    <GalleryPostsGallery galleryId={params.galleryId} />
  )
}
