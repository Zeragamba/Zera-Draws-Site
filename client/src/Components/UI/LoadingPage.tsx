import { FC } from 'react'

import { Spinner } from './Spinner'
import { PublicLayout } from '../Layouts'

export const LoadingPage: FC = () => {
  return (
    <PublicLayout>
      <Spinner />
    </PublicLayout>
  )
}
