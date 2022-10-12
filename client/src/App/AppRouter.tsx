import { FC } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import { useCurrentUser } from '../Lib/ServerApi/EndPoints/User/GetCurrentUser'
import { UploadPage } from '../Pages/Admin'
import { LoginPage } from '../Pages/Admin/LoginPage/LoginPage'
import { HomePage } from '../Pages/HomePage'
import { AdminLayout } from '../UI/Layout/AdminLayout'

export const AppRouter: FC = () => {
  const userQuery = useCurrentUser()

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />

      {userQuery.data && userQuery.data.admin && (
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="" element={<Navigate to={'./upload'} />} />
          <Route path="upload" element={<UploadPage />} />
          <Route path="*" element={<Navigate to={'./upload'} />} />
        </Route>
      )}

      <Route path="*" element={<Navigate to={'/'} />} />
    </Routes>
  )
}
