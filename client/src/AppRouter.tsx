import React from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'

import { EditPostPage, NewPostPage } from './Lib/Posts/Pages'
import { AboutPage } from './Theme/DefaultTheme/About/AboutPage'
import { EditAboutPage } from './Theme/DefaultTheme/Admin/About/EditAboutPage'
import { AdminLayout } from './Theme/DefaultTheme/Admin/AdminLayout'
import { MetricsPage } from './Theme/DefaultTheme/Admin/Metrics/MetricsPage'
import { EditPostsPage } from './Theme/DefaultTheme/Admin/Posts/EditPostsPage'
import { EditSocialsPage } from './Theme/DefaultTheme/Admin/Socials/EditSocialsPage'
import { EditTagsPage } from './Theme/DefaultTheme/Admin/Tags/EditTagsPage'
import { AllPostsGallery } from './Theme/DefaultTheme/Galleries/AllPostsGallery'
import { LatestPostPage, ViewPostPage } from './Theme/DefaultTheme/Posts'
import { ArchivePage } from './Theme/DefaultTheme/Posts/ArchivePage'
import { ViewTagPage } from './Theme/DefaultTheme/Tags/ViewTagPage'
import { LoginPage } from './Theme/DefaultTheme/Users/Login/Pages'
import { MainLayout } from './Theme/ZeraDark/Layout'

export const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '/', element: <AllPostsGallery /> },

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
