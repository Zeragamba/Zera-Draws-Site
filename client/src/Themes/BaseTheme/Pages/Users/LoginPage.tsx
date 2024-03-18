import { FC } from 'react'
import { Navigate } from 'react-router-dom'

import { useCurrentUser$ } from '../../../../Queries'
import { LoginForm } from '../../Components'

export const LoginPage: FC = () => {
  const userQuery = useCurrentUser$()

  if (userQuery.isFetching) return <div>Loading...</div>
  if (userQuery.data) return <Navigate to={'/'} />

  return (
    <LoginForm />
  )
}
