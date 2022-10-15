import { FC } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import { useCurrentUser } from '../Lib/ServerApi'
import { HomePage, LoginPage, NewPostPage } from '../Pages'

export const AppRouter: FC = () => {
  const userQuery = useCurrentUser()

  const isAdmin = userQuery.data && userQuery.data.admin

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />

      {isAdmin && (
        <Route path="/post/new" element={<NewPostPage />} />
      )}

      <Route path="*" element={<Navigate to={'/'} />} />
    </Routes>
  )
}
