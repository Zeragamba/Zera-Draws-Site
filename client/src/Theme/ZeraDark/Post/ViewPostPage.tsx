import { FC } from 'react'
import { Navigate } from 'react-router-dom'

import { ViewPost } from './ViewPost'
import { useViewPostPage } from '../../../Components/Posts/UseViewPostPage'
import { LoadingPage } from '../../../Components/UI/LoadingPage'

export const ViewPostPage: FC = () => {
  const ctrl = useViewPostPage()

  if (ctrl.isPending) return <LoadingPage />
  if (!ctrl.post) return <Navigate to="/" />

  return (
    <ViewPost post={ctrl.post} onPostChange={ctrl.onPostChange} />
  )
}