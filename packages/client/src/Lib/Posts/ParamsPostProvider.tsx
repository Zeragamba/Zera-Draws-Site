import { FC, PropsWithChildren, ReactNode } from "react"
import { useParams } from "react-router-dom"
import { useOptionalTag$ } from "../../Queries"
import { PostProvider } from "./PostProvider.tsx"
import { useOptionalGallery$ } from "../Galleries"
import { usePost$ } from "./PostQuries.ts"

export type ParamsPostProviderProps = PropsWithChildren<{
  renderPending: ReactNode
}>

export const ParamsPostProvider: FC<ParamsPostProviderProps> = ({
  renderPending,
  children,
}) => {
  const { postId, tagId, galleryId } = useParams()
  if (!postId) throw new Error("no postId provided")

  const post$ = usePost$({ postId, tagId, galleryId })
  const post = post$.data

  const tag$ = useOptionalTag$({ tagId })
  const tag = tag$.data

  const gallery$ = useOptionalGallery$({ galleryId })
  const gallery = gallery$.data

  if (post$.isPending) return renderPending
  if (!post) throw new Error("Post not found")

  return (
    <PostProvider post={post} tag={tag} gallery={gallery} children={children} />
  )
}
