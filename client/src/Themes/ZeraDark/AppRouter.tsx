import React from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'

import { MainLayout } from './Layouts'
import {
  AboutPage,
  AllPostsGalleryPage,
  EditAboutPage,
  EditPostsPage,
  EditSocialsPage,
  EditTagsPage,
  MetricsPage,
  AdminLayout,
  LatestPostPage,
  ViewPostPage,
  EditPostPage,
  ArchivePage,
  NewPostPage,
  ViewTagPage,
  LoginPage,
} from '../BaseTheme'

export const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '/', element: <AllPostsGalleryPage /> },

      { path: 'latest', element: <LatestPostPage /> },
      { path: 'archive', element: <ArchivePage /> },

      { path: 'post/:postId', element: <ViewPostPage /> },
      { path: 'post/:postId/edit', element: <EditPostPage /> },
      { path: 'post/new', element: <NewPostPage /> },

      { path: 'tag/:tagId', element: <ViewTagPage /> },
      { path: 'tag/:tagId/:postId', element: <ViewPostPage /> },

      { path: 'about', element: <AboutPage /> },

      { path: 'login', element: <LoginPage /> },

      {
        path: 'admin',
        element: <AdminLayout />,
        children: [
          { index: true, element: <Navigate to={'about'} /> },
          { path: 'about', element: <EditAboutPage /> },
          { path: 'socials', element: <EditSocialsPage /> },
          { path: 'tags', element: <EditTagsPage /> },
          { path: 'posts', element: <EditPostsPage /> },
          { path: 'metrics', element: <MetricsPage /> },
          { path: '*', element: <Navigate to={'about'} /> },
        ],
      },

      { path: '*', element: <Navigate to={'/'} replace /> },
    ],
  },
])
