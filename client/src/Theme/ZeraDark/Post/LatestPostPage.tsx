import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

import { ViewPost } from './ViewPost'
import { ArchivePage } from '../../../Components/Archive/ArchivePage'
import { useLatestPost$ } from '../../../Components/Posts/PostsApi'
import { LoadingPage } from '../../../Components/UI/LoadingPage'

export const LatestPostPage: FC = () => {
  const navigate = useNavigate()
  const latestPost$ = useLatestPost$()

  if (latestPost$.isPending) return <LoadingPage />
  if (latestPost$.isError) return <ArchivePage />

  const latestPost = latestPost$.data

  return (
    <ViewPost post={latestPost} onPostChange={(post) => navigate(`/post/${post.slug}`)} />
  )
}
