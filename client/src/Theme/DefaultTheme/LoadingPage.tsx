import { FC } from 'react'

import { PublicLayout } from './Layout'
import { Spinner } from './Spinner/Spinner'

export const LoadingPage: FC = () => {
  return (
    <PublicLayout>
      <Spinner />
    </PublicLayout>
  )
}
