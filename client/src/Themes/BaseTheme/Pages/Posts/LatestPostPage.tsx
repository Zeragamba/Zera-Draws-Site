import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

import { ArchivePage } from './ArchivePage'
import { useLatestPost$ } from '../../../../Lib'
import { ViewPost } from '../../Components'
import { PostProvider } from '../../Components/Posts/PostProvider'
import { LoadingPage } from '../LoadingPage'

export const LatestPostPage: FC = () => {
  const navigate = useNavigate()
  const latestPost$ = useLatestPost$()

  if (latestPost$.isPending) return <LoadingPage />
  if (latestPost$.isError) return <ArchivePage />

  const latestPost = latestPost$.data

  return (
    <PostProvider post={latestPost}>
      <ViewPost post={latestPost} onPostChange={(post) => navigate(`/post/${post.slug}`)} />
    </PostProvider>
  )
}
