import { FC } from 'react'
import { Navigate } from 'react-router-dom'

import { useFirstPost$ } from './PostsApi'
import { ArchivePage } from '../Archive/ArchivePage'
import { LoadingPage } from '../UI/LoadingPage'

export const FirstPostPage: FC = () => {
  const firstPost$ = useFirstPost$()

  if (firstPost$.isLoading) return <LoadingPage />
  if (firstPost$.isError) return <ArchivePage />

  const firstPost = firstPost$.data
  return <Navigate to={`/post/${firstPost.slug}`} />
}
