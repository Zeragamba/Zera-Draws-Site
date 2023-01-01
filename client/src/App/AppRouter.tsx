import { createBrowserHistory, History } from 'history'
import { FC } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import { useCurrentUser } from '../Components/User/UsersApi'
import * as Pages from '../Pages'

export const AppRouter: FC = () => {
  const userQuery = useCurrentUser()

  const isAdmin = !!(userQuery.data && userQuery.data.admin)

  return (
    <BrowserRouter>
      <Routes>
        {publicRoutes()}
        {adminRoutes(isAdmin)}
        {fallbackRoute(userQuery.isFetching)}
      </Routes>
    </BrowserRouter>
  )
}

const publicRoutes = () => {
  return (
    <>
      <Route path="/" element={<Pages.HomePage />} />
      <Route path="/login" element={<Pages.LoginPage />} />
      <Route path="/post/:postId" element={<Pages.ViewPostPage />} />
      <Route path="/tag/:tagId/:postId" element={<Pages.ViewPostPage />} />
      <Route path="/gallery/:galleryId/:postId" element={<Pages.ViewPostPage />} />
    </>
  )
}

const adminRoutes = (isAdmin: boolean) => {
  if (!isAdmin) return null

  return (
    <>
      <Route path="/post/new" element={<Pages.NewPostPage />} />
      <Route path="/post/:postId/edit" element={<Pages.EditPostPage />} />
    </>
  )
}

const fallbackRoute = (authorizing: boolean) => {
  const page = authorizing ? <Pages.AuthorizingPage /> : <Navigate to={'/'} />

  return (
    <Route path="*" element={page} />
  )
}

export const useHistory = (): History => {
  return createBrowserHistory()
}
