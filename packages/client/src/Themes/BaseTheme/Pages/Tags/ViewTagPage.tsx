import { Paper } from '@mui/material'
import { FC } from 'react'
import { Navigate, useParams } from 'react-router-dom'

import { TaggedPostsGallery } from '../../Components'

export const ViewTagPage: FC = () => {
  const params = useParams()
  if (!params.tagId) return <Navigate to="/" />

  return (
    <Paper>
      <TaggedPostsGallery tagId={params.tagId} />
    </Paper>
  )
}
