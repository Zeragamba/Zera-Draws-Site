import { FC } from 'react'
import { Navigate } from 'react-router-dom'

import { useAppSelector } from '../../../Store/AppState'
import { AppNavBar } from '../../../UI/AppNavBar'
import { LoginForm } from './LoginForm'


export const LoginPage: FC = () => {
  const currentUser = useAppSelector(state => state.currentUser)

  if (currentUser) {
    return (
      <Navigate to={'/'} />
    )
  }

  return (
    <>
      <AppNavBar />
      <LoginForm />
    </>
  )
}
