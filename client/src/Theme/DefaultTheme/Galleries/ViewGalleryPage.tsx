import { FC } from 'react'
import { Navigate, useParams } from 'react-router-dom'

import { GalleryPostsGallery } from './GalleryPostsGallery'
import { PublicLayout } from '../Layout'

export const ViewGalleryPage: FC = () => {
  const params = useParams()
  if (!params.galleryId) return <Navigate to="/" />

  return (
    <PublicLayout galleryId={params.galleryId}>
      <GalleryPostsGallery galleryId={params.galleryId} />
    </PublicLayout>
  )
}
