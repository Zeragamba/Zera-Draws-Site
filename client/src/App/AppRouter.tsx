import { FC } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import { AdminLayout, UploadPage } from '../Pages/Admin'
import { LoginPage } from '../Pages/Admin/LoginPage/LoginPage'
import { HomePage } from '../Pages/HomePage'
import { useAppSelector } from '../Store/AppState'
import { selectCurrentUser } from '../Store/Reducers/UserReducer'

export const AppRouter: FC = () => {
  const currentUser = useAppSelector(state => selectCurrentUser(state))

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
