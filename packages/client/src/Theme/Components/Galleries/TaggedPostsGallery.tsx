import { FC } from "react"
import { useTag$, useTaggedPosts$ } from "../../../Lib"

import { GalleryTitle } from "./GalleryTitle"
import { PostGallery } from "./PostGallery"

interface TagGalleryDisplayProps {
  tagId: string
}

export const TaggedPostsGallery: FC<TagGalleryDisplayProps> = ({ tagId }) => {
  const { data: tag } = useTag$({ tagId })
  const posts$ = useTaggedPosts$({ tagId })

  return (
    <>
      <GalleryTitle>{tag?.name || "..."}</GalleryTitle>
      <PostGallery postsQuery={posts$} tagSlug={tag?.slug} />
    </>
  )
}
