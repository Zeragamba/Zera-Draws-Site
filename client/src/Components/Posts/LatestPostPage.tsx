import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

import { useLatestPost$ } from './PostsApi/GetLatestPost'
import { ViewPost } from './ViewPost/ViewPost'
import { ArchivePage } from '../Archive/ArchivePage'
import { PublicLayout } from '../Layouts'
import { LoadingPage } from '../UI/LoadingPage'

export const LatestPostPage: FC = () => {
  const navigate = useNavigate()
  const latestPost$ = useLatestPost$()

  if (latestPost$.isLoading) return <LoadingPage />
  if (latestPost$.isError) return <ArchivePage />

  const latestPost = latestPost$.data

  return (
    <PublicLayout>
      <ViewPost
        postId={latestPost.id}
        onPostChange={(post) => navigate(`/post/${post.slug}`)}
      />
    </PublicLayout>
  )
}
