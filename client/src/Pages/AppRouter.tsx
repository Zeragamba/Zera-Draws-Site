import { createBrowserHistory } from 'history'
import { FC } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import { useCurrentUser } from '../Lib/ServerApi'
import { ViewPostPage } from './Posts/ViewPostPage'

import { HomePage, LoginPage, NewPostPage } from './index'

export const AppRouter: FC = () => {
  const userQuery = useCurrentUser()

  const isAdmin = userQuery.data && userQuery.data.admin

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/post/:postId" element={<ViewPostPage />} />

        {isAdmin && (
          <Route path="/post/new" element={<NewPostPage />} />
        )}

        <Route path="*" element={<Navigate to={'/'} />} />
      </Routes>
    </BrowserRouter>
  )
}

export const useHistory = () => {
  return createBrowserHistory()
}
