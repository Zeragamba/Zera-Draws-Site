import { createBrowserRouter, Navigate } from "react-router-dom"
import { FeaturedPostsGallery } from "./Components"

import { AdminLayout, MainLayout } from "./Layouts"
import {
  AboutPage,
  AccountPage,
  AllPostsGalleryPage,
  ArchivePage,
  EditAboutPage,
  EditPostPage,
  EditPostsPage,
  EditSocialsPage,
  EditTagsPage,
  HomePage,
  LatestPostPage,
  LoginPage,
  MetricsPage,
  NewPostPage,
  ViewPostPage,
  ViewTagPage,
} from "./Pages"

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <HomePage /> },

      { path: "all", element: <AllPostsGalleryPage /> },
      { path: "featured", element: <FeaturedPostsGallery /> },
      { path: "latest", element: <LatestPostPage /> },
      { path: "archive", element: <ArchivePage /> },

      { path: "post/:postId", element: <ViewPostPage /> },
      { path: "post/:postId/edit", element: <EditPostPage /> },

      { path: "tag/:tagId", element: <ViewTagPage /> },
      { path: "tag/:tagId/:postId", element: <ViewPostPage /> },

      { path: "about", element: <AboutPage /> },

      { path: "login", element: <LoginPage /> },
    ],
  },

  {
    path: "admin",
    element: <AdminLayout />,
    children: [
      { index: true, element: <Navigate to={"post/new"} /> },
      { path: "post/new", element: <NewPostPage /> },
      { path: "post/:postId/edit", element: <EditPostPage /> },
      { path: "account", element: <AccountPage /> },
      { path: "about", element: <EditAboutPage /> },
      { path: "socials", element: <EditSocialsPage /> },
      { path: "tags", element: <EditTagsPage /> },
      { path: "posts", element: <EditPostsPage /> },
      { path: "metrics", element: <MetricsPage /> },
      { path: "*", element: <Navigate to={"post/new"} /> },
    ],
  },

  { path: "*", element: <Navigate to={"/"} replace /> },
])
