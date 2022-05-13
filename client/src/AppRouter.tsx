import { FC } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import { AdminLayout, UploadPage } from './Pages/Admin'
import { LoginPage } from './Pages/Admin/LoginPage/LoginPage'
import { HomePage } from './Pages/HomePage'
import { useCurrentUser } from './User/UserContext'

export const AppRouter: FC = () => {
  const [currentUser] = useCurrentUser()

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route path="/admin" element={<AdminLayout />}>
        <Route path="" element={<Navigate to={'./upload'} />} />

        {currentUser && currentUser.admin ? (
          <>
            <Route path="upload" element={<UploadPage />} />
            <Route path="*" element={<Navigate to={'./upload'} />} />
          </>
        ) : (
          <Route path="*" element={<LoginPage />} />
        )}
      </Route>
    </Routes>
  )
}
