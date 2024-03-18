import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

import { LoadingPage } from './LoadingPage'
import { ArchivePage } from './Posts'
import { useLatestPost$ } from '../../../Queries'
import { ViewPost } from '../Components'

export const HomePage: FC = () => {
  const navigate = useNavigate()
  const latestQuery$ = useLatestPost$()

  if (latestQuery$.isPending) return <LoadingPage />
  if (latestQuery$.isError) return <ArchivePage />

  const latestPost = latestQuery$.data

  return (
    <ViewPost
      post={latestPost}
      onPostChange={(post) => navigate(`/post/${post.slug}`)}
    />
  )
}
