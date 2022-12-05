import { FC } from 'react'
import { Navigate } from 'react-router-dom'

import { PublicLayout } from '../Components/Layouts'
import { LoginForm } from '../Components/Login/LoginForm'
import { useCurrentUser } from '../Components/User/UsersApi'

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
