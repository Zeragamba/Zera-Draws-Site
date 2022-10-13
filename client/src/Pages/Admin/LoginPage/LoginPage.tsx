import { FC } from 'react'
import { Navigate } from 'react-router-dom'

import { AppNavBar } from '../../../Components/UI/AppNavBar'
import { useCurrentUser } from '../../../Lib/ServerApi/EndPoints/User/GetCurrentUser'
import { LoginForm } from './LoginForm'


export const LoginPage: FC = () => {
  const userQuery = useCurrentUser()

  if (userQuery.isLoading) {
    return <div>Loading...</div>
  }

  if (userQuery.data) {
    return <Navigate to={'/'} />
  }

  return (
    <>
      <AppNavBar />
      <LoginForm />
    </>
  )
}
