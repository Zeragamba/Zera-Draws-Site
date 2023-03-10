import React from 'react'
import { Navigate, RouteObject } from 'react-router-dom'

import { AboutPage } from './Components/About/AboutPage'
import { AdminPage } from './Components/Admin/AdminPage'
import { AdminRoutes } from './Components/Admin/Routes'
import { ArchivePage } from './Components/Archive/ArchivePage'
import { HomePage } from './Components/HomePage'
import { LatestPostPage } from './Components/Posts/LatestPostPage'
import { EditPostPage, NewPostPage, ViewPostPage } from './Components/Posts/Pages'
import { ViewTagPage } from './Components/Tags/ViewTagPage'
import { LoginPage } from './Components/User/Login/Pages'

export const routes: RouteObject[] = [
  { index: true, element: <HomePage /> },

  { path: 'login', element: <LoginPage /> },
  { path: 'about', element: <AboutPage /> },
  { path: 'latest', element: <LatestPostPage /> },

  { path: 'admin', element: <AdminPage />, children: AdminRoutes },

  { path: 'archive', element: <ArchivePage /> },

  { path: 'post/new', element: <NewPostPage /> },
  { path: 'post/:postId', element: <ViewPostPage /> },
  { path: 'post/:postId/edit', element: <EditPostPage /> },

  { path: 'tag/:tagId', element: <ViewTagPage /> },
  { path: 'tag/:tagId/:postId', element: <ViewPostPage /> },

  { path: '*', element: <Navigate to={'/'} replace /> },
]
