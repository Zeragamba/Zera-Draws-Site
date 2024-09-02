import { FC } from "react"
import { useAllPosts$ } from "../../../Lib"

import { PostGallery, PostGalleryProps } from "./PostGallery"

export const AllPostsGallery: FC<Omit<PostGalleryProps, "postsQuery">> = (
  galleryProps,
) => {
  const postsQuery = useAllPosts$()
  return <PostGallery postsQuery={postsQuery} {...galleryProps} />
}
