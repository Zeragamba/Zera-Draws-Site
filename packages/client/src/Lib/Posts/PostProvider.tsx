import { FC, PropsWithChildren, useEffect, useState } from "react"
import { TagData } from "../Tags"
import { PostContext } from "./PostContext"
import { PostData } from "./PostData"
import { GalleryData } from "../Galleries"

export type PostProviderProps = PropsWithChildren<{
  post: PostData
  tag?: TagData | null
  gallery?: GalleryData | null
}>

export const PostProvider: FC<PostProviderProps> = ({
  post,
  tag,
  gallery,
  children,
}) => {
  const [imageIndex, setImageIndex] = useState<number>(0)
  useEffect(() => setImageIndex(0), [post])

  return (
    <PostContext.Provider
      value={{ post, tag, gallery, imageIndex, setImageIndex }}
      children={children}
    />
  )
}
