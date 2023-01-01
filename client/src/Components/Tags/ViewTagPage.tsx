import { FC } from 'react'
import { Navigate, useParams } from 'react-router-dom'

import { PublicLayout } from '../Layouts'
import { TagGallery } from './TagGallery'

export const ViewTagPage: FC = () => {
  const params = useParams()
  if (!params.tagId) return <Navigate to="/" />

  return (
    <PublicLayout>
      <TagGallery tagId={params.tagId} />
    </PublicLayout>
  )
}
