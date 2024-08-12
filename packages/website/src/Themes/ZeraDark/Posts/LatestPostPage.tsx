import { FC } from 'react'

import { LatestPostProvider } from '../../../Contexts'
import { LoadingPage } from '../../BaseTheme'
import { ViewPost } from '../Components'


export const LatestPostPage: FC = () => {
  return (
    <LatestPostProvider renderPending={<LoadingPage />}>
      <ViewPost />
    </LatestPostProvider>
  )
}
