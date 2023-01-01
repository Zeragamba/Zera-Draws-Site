import { FC } from 'react'
import { Navigate, useParams } from 'react-router-dom'

import { TaggedPostsGallery } from '../Gallery/Galleries/TaggedPostsGallery'
import { PublicLayout } from '../Layouts'

export const ViewTagPage: FC = () => {
  const params = useParams()
  if (!params.tagId) return <Navigate to="/" />

  return (
    <PublicLayout>
      <TaggedPostsGallery tagId={params.tagId} />
    </PublicLayout>
  )
}
