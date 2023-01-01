import { FC } from 'react'
import { Navigate, useParams } from 'react-router-dom'

import { PublicLayout } from '../Layouts'
import { GalleryPostsGallery } from './Galleries/GalleryPostsGallery'

export const ViewGalleryPage: FC = () => {
  const params = useParams()
  if (!params.galleryId) return <Navigate to="/" />

  return (
    <PublicLayout>
      <GalleryPostsGallery galleryId={params.galleryId} />
    </PublicLayout>
  )
}
