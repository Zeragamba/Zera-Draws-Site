import { FC } from 'react'

import { ParamsPostProvider } from '../../../Contexts'
import { LoadingPage } from '../../BaseTheme'
import { ViewPost } from '../Components'

export const ViewPostPage: FC = () => {
  return (
    <ParamsPostProvider renderPending={<LoadingPage />}>
      <ViewPost />
    </ParamsPostProvider>
  )
}
