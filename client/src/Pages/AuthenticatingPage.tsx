import { FC } from 'react'

import { Glass } from '../Components/UI/Glass'
import { PublicLayout } from '../Layouts'

export const AuthorizingPage: FC = () => {
  return (
    <PublicLayout>
      <Glass textAlign={'center'} padding={4}>Authorizing</Glass>
    </PublicLayout>
  )
}
