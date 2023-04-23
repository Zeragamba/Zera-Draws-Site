import React from 'react'
import { Navigate, RouteObject } from 'react-router-dom'

import { EditAboutPage } from './About/EditAboutPage'
import { MetricsPage } from './Metrics/MetricsPage'
import { EditPostsPage } from './Posts/EditPostsPage'
import { EditSocialsPage } from './Socials/EditSocialsPage'
import { EditTagsPage } from './Tags/EditTagsPage'

export const AdminRoutes: RouteObject[] = [
  { index: true, element: <Navigate to={'about'} /> },
  { path: 'socials', element: <EditSocialsPage /> },
  { path: 'about', element: <EditAboutPage /> },
  { path: 'tags', element: <EditTagsPage /> },
  { path: 'posts', element: <EditPostsPage /> },
  { path: 'metrics', element: <MetricsPage /> },
  { path: '*', element: <Navigate to={'about'} /> },
]
