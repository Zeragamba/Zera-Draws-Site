import { FC } from "react"
import { useGallery$, useGalleryPosts$ } from "../../../Lib"

import { GalleryTitle } from "./GalleryTitle"
import { PostGallery } from "./PostGallery"

interface GalleryDisplayProps {
  galleryId: string
}

export const GalleryPostsGallery: FC<GalleryDisplayProps> = ({ galleryId }) => {
  const { data: gallery } = useGallery$({ galleryId: galleryId })
  const postsQuery = useGalleryPosts$({ galleryId: galleryId })

  return (
    <>
      <GalleryTitle>{gallery?.name || "..."}</GalleryTitle>
      <PostGallery postsQuery={postsQuery} />
    </>
  )
}
