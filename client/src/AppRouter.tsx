import React from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'

import { AboutPage } from './Components/About/AboutPage'
import { AdminLayout } from './Components/Admin/AdminLayout'
import { AdminRoutes } from './Components/Admin/Routes'
import { ArchivePage } from './Components/Archive/ArchivePage'
import { AllPostsGallery } from './Components/Gallery/Galleries/AllPostsGallery'
import { LatestPostPage } from './Components/Posts/LatestPostPage'
import { EditPostPage, NewPostPage, ViewPostPage } from './Components/Posts/Pages'
import { ViewTagPage } from './Components/Tags/ViewTagPage'
import { LoginPage } from './Components/User/Login/Pages'
import { MainLayout } from './Theme/ZeraDark'

export const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '/', element: <AllPostsGallery /> },
    ],
  },

  { path: 'login', element: <LoginPage /> },
  { path: 'about', element: <AboutPage /> },
  { path: 'latest', element: <LatestPostPage /> },

  { path: 'admin', element: <AdminLayout />, children: AdminRoutes },

  { path: 'archive', element: <ArchivePage /> },

  { path: 'post/new', element: <NewPostPage /> },
  { path: 'post/:postId', element: <ViewPostPage /> },
  { path: 'post/:postId/edit', element: <EditPostPage /> },

  { path: 'tag/:tagId', element: <ViewTagPage /> },
  { path: 'tag/:tagId/:postId', element: <ViewPostPage /> },

  { path: '*', element: <Navigate to={'/'} replace /> },
])
