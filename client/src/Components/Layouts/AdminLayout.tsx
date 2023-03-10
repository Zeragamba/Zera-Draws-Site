import React from 'react'
import { Navigate } from 'react-router-dom'

import { Layout } from './Layout'
import { PublicLayout } from './PublicLayout'
import { AuthorizingPage } from '../User/Login/AuthenticatingPage'
import { LoginPage } from '../User/Login/LoginPage'
import { useCurrentUser } from '../User/UsersApi'


export const AdminLayout: Layout = ({ children }) => {
  const userQuery = useCurrentUser()

  if (userQuery.isFetching) return <AuthorizingPage />
  if (!userQuery.data) return <LoginPage />
  if (!userQuery.data.admin) return <Navigate to={'/'} />

  return (
    <PublicLayout>
      {children}
    </PublicLayout>
  )
}
