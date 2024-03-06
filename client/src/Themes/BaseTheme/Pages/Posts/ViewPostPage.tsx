import { FC } from 'react'
import { Navigate } from 'react-router-dom'

import { useViewPostPage } from '../../../../Lib'
import { ViewPost } from '../../Components/Posts/ViewPost'
import { LoadingPage } from '../LoadingPage'

export const ViewPostPage: FC = () => {
  const ctrl = useViewPostPage()

  if (ctrl.isPending) return <LoadingPage />
  if (!ctrl.post) return <Navigate to="/" />

  return (
    <ViewPost post={ctrl.post} onPostChange={ctrl.onPostChange} />
  )
}
