import { FC } from 'react'

import { LoadingPage } from './LoadingPage'
import { LatestPostProvider } from '../../../Contexts'
import { ViewPost } from '../Components'

export const HomePage: FC = () => {
  return (
    <LatestPostProvider renderPending={<LoadingPage />}>
      <ViewPost />
    </LatestPostProvider>
  )
}
