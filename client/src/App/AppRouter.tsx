import { createBrowserHistory, History } from 'history'
import { FC } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import { useCurrentUser } from '../Components/User/UsersApi'
import { AuthorizingPage } from '../Pages/AuthenticatingPage'
import { HomePage } from '../Pages/HomePage'
import { LoginPage } from '../Pages/LoginPage'
import { EditPostPage, NewPostPage, ViewPostPage } from '../Pages/Posts'

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
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/post/:postId" element={<ViewPostPage />} />
      <Route path="/tag/:tagId/:postId" element={<ViewPostPage />} />
      <Route path="/gallery/:galleryId/:postId" element={<ViewPostPage />} />
    </>
  )
}

const adminRoutes = (isAdmin: boolean) => {
  if (!isAdmin) return null

  return (
    <>
      <Route path="/post/new" element={<NewPostPage />} />
      <Route path="/post/:postId/edit" element={<EditPostPage />} />
    </>
  )
}

const fallbackRoute = (authorizing: boolean) => {
  const page = authorizing ? <AuthorizingPage /> : <Navigate to={'/'} />

  return (
    <Route path="*" element={page} />
  )
}

export const useHistory = (): History => {
  return createBrowserHistory()
}
