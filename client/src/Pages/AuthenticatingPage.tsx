import { FC } from 'react'

import { PublicLayout } from '../Components/Layouts'
import { Glass } from '../Components/UI/Glass'

export const AuthorizingPage: FC = () => {
  return (
    <PublicLayout>
      <Glass textAlign={'center'} padding={4}>Authorizing</Glass>
    </PublicLayout>
  )
}
