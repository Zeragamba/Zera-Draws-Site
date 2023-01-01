import { FC } from 'react'

import { PublicLayout } from '../Layouts'
import { Glass } from '../UI/Glass'

export const AuthorizingPage: FC = () => {
  return (
    <PublicLayout>
      <Glass textAlign={'center'} padding={4}>Authorizing</Glass>
    </PublicLayout>
  )
}
