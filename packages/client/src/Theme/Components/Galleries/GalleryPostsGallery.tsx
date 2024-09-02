import { FC } from "react"

import { GalleryTitle } from "./GalleryTitle"
import { PostGallery } from "./PostGallery"
import { useGallery$, useGalleryPosts$ } from "../../../Lib"

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
