import { FC } from 'react'
import { Navigate } from 'react-router-dom'

import { LoginForm } from './LoginForm'
import { PublicLayout } from '../../Layouts'
import { useCurrentUser } from '../UsersApi'

export const LoginPage: FC = () => {
  const userQuery = useCurrentUser()

  if (userQuery.isFetching) {
    return <div>Loading...</div>
  }

  if (userQuery.data) {
    return <Navigate to={'/'} />
  }

  return (
    <PublicLayout>
      <LoginForm />
    </PublicLayout>
  )
}
