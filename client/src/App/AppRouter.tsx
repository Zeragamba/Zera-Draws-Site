import { createBrowserHistory, History } from 'history'
import { FC } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import { useCurrentUser } from '../Components/User/UsersApi'
import * as Pages from '../Pages'

export const AppRouter: FC = () => {
  const userQuery = useCurrentUser()
  const isAdmin = !!(userQuery.data && userQuery.data.admin)

  const fallbackPage = userQuery.isFetching ? (<Pages.AuthorizingPage />) : (<Navigate to={'/'} />)

  return (
    <BrowserRouter>
      <Routes>
        <>
          <Route path="/" element={<Pages.HomePage />} />
          <Route path="/login" element={<Pages.LoginPage />} />

          <Route path="/post/:postId" element={<Pages.ViewPostPage />} />

          <Route path="/tag/:tagId" element={<Pages.ViewTagPage />} />
          <Route path="/tag/:tagId/:postId" element={<Pages.ViewPostPage />} />

          <Route path="/gallery/:galleryId" element={<Pages.ViewGalleryPage />} />
          <Route path="/gallery/:galleryId/:postId" element={<Pages.ViewPostPage />} />
        </>

        {isAdmin && (
          <>
            <Route path="/post/new" element={<Pages.NewPostPage />} />
            <Route path="/post/:postId/edit" element={<Pages.EditPostPage />} />
          </>
        )}

        <Route path="*" element={fallbackPage} />
      </Routes>
    </BrowserRouter>
  )
}
export const useHistory = (): History => {
  return createBrowserHistory()
}
