import { FC } from 'react'
import { Navigate, useParams } from 'react-router-dom'

import { PublicLayout } from '../Layouts'
import { Gallery } from './Gallery'

export const ViewGalleryPage: FC = () => {
  const params = useParams()
  if (!params.galleryId) return <Navigate to="/" />

  return (
    <PublicLayout>
      <Gallery galleryId={params.galleryId} />
    </PublicLayout>
  )
}
