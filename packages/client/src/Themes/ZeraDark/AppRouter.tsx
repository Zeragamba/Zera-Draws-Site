import { createBrowserRouter, Navigate } from "react-router-dom"

import { MainLayout } from "./Layouts"
import { HomePage } from "./Pages/HomePage"
import { LatestPostPage, ViewPostPage } from "./Posts"
import {
  AboutPage,
  AccountPage,
  AdminLayout,
  AllPostsGalleryPage,
  ArchivePage,
  EditAboutPage,
  EditPostPage,
  EditPostsPage,
  EditSocialsPage,
  EditTagsPage,
  FeaturedPostsGallery,
  LoginPage,
  MetricsPage,
  NewPostPage,
  ViewTagPage,
} from "../../Theme"

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
      { path: "post/new", element: <NewPostPage /> },

      { path: "tag/:tagId", element: <ViewTagPage /> },
      { path: "tag/:tagId/:postId", element: <ViewPostPage /> },

      { path: "about", element: <AboutPage /> },

      { path: "login", element: <LoginPage /> },

      {
        path: "admin",
        element: <AdminLayout />,
        children: [
          { index: true, element: <Navigate to={"account"} /> },
          { path: "account", element: <AccountPage /> },
          { path: "about", element: <EditAboutPage /> },
          { path: "socials", element: <EditSocialsPage /> },
          { path: "tags", element: <EditTagsPage /> },
          { path: "posts", element: <EditPostsPage /> },
          { path: "metrics", element: <MetricsPage /> },
          { path: "*", element: <Navigate to={"account"} /> },
        ],
      },

      { path: "*", element: <Navigate to={"/"} replace /> },
    ],
  },
])
