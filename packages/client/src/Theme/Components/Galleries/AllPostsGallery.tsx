import { FC } from "react"

import { PostGallery, PostGalleryProps } from "./PostGallery"
import { useAllPosts$ } from "../../../Queries"

export const AllPostsGallery: FC<Omit<PostGalleryProps, "postsQuery">> = (
  galleryProps,
) => {
  const postsQuery = useAllPosts$()
  return <PostGallery postsQuery={postsQuery} {...galleryProps} />
}
