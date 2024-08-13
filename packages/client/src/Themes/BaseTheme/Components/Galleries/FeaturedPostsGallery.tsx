import { FC } from "react"

import { PostGallery, PostGalleryProps } from "./PostGallery"
import { useTaggedPosts$ } from "../../../../Queries"

export const FeaturedPostsGallery: FC<Omit<PostGalleryProps, "postsQuery">> = (
  galleryProps,
) => {
  const posts$ = useTaggedPosts$({ tagId: "featured" })
  return <PostGallery postsQuery={posts$} {...galleryProps} />
}
