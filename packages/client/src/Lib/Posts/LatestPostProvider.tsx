import { FC, PropsWithChildren, ReactNode } from "react"
import { PostProvider } from "./PostProvider"
import { useLatestPost$ } from "./PostQuries"

export type LatestPostProviderProps = PropsWithChildren<{
  renderPending: ReactNode
}>

export const LatestPostProvider: FC<LatestPostProviderProps> = ({
  renderPending,
  children,
}) => {
  const latestPost$ = useLatestPost$()
  const latestPost = latestPost$.data

  if (latestPost$.isPending) return renderPending
  if (!latestPost) throw new Error("No latest post found")

  return <PostProvider post={latestPost} children={children} />
}
