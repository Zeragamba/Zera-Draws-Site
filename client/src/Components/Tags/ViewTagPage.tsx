import { FC } from 'react'
import { Navigate, useParams } from 'react-router-dom'

import { TaggedPostsGallery } from '../Gallery/Galleries/TaggedPostsGallery'

export const ViewTagPage: FC = () => {
  const params = useParams()
  if (!params.tagId) return <Navigate to="/" />

  return (
    <TaggedPostsGallery tagId={params.tagId} />
  )
}
