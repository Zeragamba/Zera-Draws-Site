import React from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'

import { AboutPage } from './Components/About/AboutPage'
import { AdminLayout } from './Components/Admin/AdminLayout'
import { AdminRoutes } from './Components/Admin/Routes'
import { ArchivePage } from './Components/Archive/ArchivePage'
import { AllPostsGallery } from './Components/Gallery/Galleries/AllPostsGallery'
import { EditPostPage, NewPostPage } from './Components/Posts/Pages'
import { ViewTagPage } from './Components/Tags/ViewTagPage'
import { LoginPage } from './Components/User/Login/Pages'
import { SiteTheme } from './Theme/ZeraDark'

const { Pages, Layouts } = SiteTheme

export const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Layouts.MainLayout />,
    children: [
      { path: '/', element: <AllPostsGallery /> },

      { path: 'latest', element: <Pages.LatestPost /> },

      { path: 'post/:postId', element: <Pages.ViewPost /> },

      { path: 'tag/:tagId', element: <ViewTagPage /> },
      { path: 'tag/:tagId/:postId', element: <Pages.ViewPost /> },
    ],
  },

  { path: 'login', element: <LoginPage /> },
  { path: 'about', element: <AboutPage /> },

  { path: 'admin', element: <AdminLayout />, children: AdminRoutes },

  { path: 'archive', element: <ArchivePage /> },

  { path: 'post/new', element: <NewPostPage /> },
  { path: 'post/:postId/edit', element: <EditPostPage /> },

  { path: '*', element: <Navigate to={'/'} replace /> },
])
