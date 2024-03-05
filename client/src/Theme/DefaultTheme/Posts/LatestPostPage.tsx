import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

import { ArchivePage } from './ArchivePage'
import { ViewPost } from './ViewPost'
import { useLatestPost$ } from '../../../Lib'
import { LoadingPage } from '../LoadingPage'

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
