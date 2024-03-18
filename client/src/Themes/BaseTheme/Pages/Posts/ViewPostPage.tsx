import { FC } from 'react'
import { Navigate } from 'react-router-dom'

import { ParamsPostProvider } from '../../../../Contexts'
import { useViewPostPage } from '../../../../Lib'
import { ViewPost } from '../../Components'
import { LoadingPage } from '../LoadingPage'

export const ViewPostPage: FC = () => {
  const ctrl = useViewPostPage()

  if (ctrl.isPending) return <LoadingPage />
  if (!ctrl.post) return <Navigate to="/" />

  return (
    <ParamsPostProvider renderPending={<LoadingPage />}>
      <ViewPost post={ctrl.post} onPostChange={ctrl.onPostChange} />
    </ParamsPostProvider>
  )
}
