import { FC, ReactNode, useEffect } from "react"

import { useInViewport } from "../../../../Hooks/UseInViewport"

export interface InfiniteGalleryProps {
  hasNextPage: boolean
  fetchNextPage: () => void
  fetchingNextPage: boolean
  children: ReactNode
}

export const InfiniteScroll: FC<InfiniteGalleryProps> = ({
  hasNextPage,
  fetchNextPage,
  fetchingNextPage,
  children,
}) => {
  const [markerRef, endInView] = useInViewport()

  useEffect(() => {
    if (!hasNextPage || !endInView) return
    fetchNextPage()
  }, [hasNextPage, endInView, fetchNextPage])

  return (
    <div>
      {children}
      {hasNextPage && <div ref={markerRef} />}
      {fetchingNextPage && (
        <div style={{ textAlign: "center", padding: "1rem" }}>
          Loading more!
        </div>
      )}
    </div>
  )
}
