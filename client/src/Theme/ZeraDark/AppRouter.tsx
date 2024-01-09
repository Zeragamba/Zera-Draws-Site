import React from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'

import { AboutPage } from './About/AboutPage'
import { EditAboutPage } from './Admin/About/EditAboutPage'
import { AdminLayout } from './Admin/AdminLayout'
import { MetricsPage } from './Admin/Metrics/MetricsPage'
import { EditPostsPage } from './Admin/Posts/EditPostsPage'
import { EditSocialsPage } from './Admin/Socials/EditSocialsPage'
import { EditTagsPage } from './Admin/Tags/EditTagsPage'
import { AllPostsGallery } from './Galleries/AllPostsGallery'
import { MainLayout } from './Layout'
import { LatestPostPage, ViewPostPage } from './Posts'
import { ArchivePage } from './Posts/ArchivePage'
import { EditPostPage } from './Posts/EditPostPage'
import { NewPostPage } from './Posts/NewPostPage'
import { ViewTagPage } from './Tags/ViewTagPage'
import { LoginPage } from './Users/Login/Pages'

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
