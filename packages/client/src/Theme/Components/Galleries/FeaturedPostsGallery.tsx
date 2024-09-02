import { FC } from "react"
import { useTaggedPosts$ } from "../../../Lib"

import { PostGallery, PostGalleryProps } from "./PostGallery"

export const FeaturedPostsGallery: FC<Omit<PostGalleryProps, "postsQuery">> = (
  galleryProps,
) => {
  const posts$ = useTaggedPosts$({ tagId: "featured" })
  return <PostGallery postsQuery={posts$} {...galleryProps} />
}
