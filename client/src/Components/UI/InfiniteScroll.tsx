import { FC, ReactNode, useEffect, useRef } from 'react'

import { useInViewport } from '../../Lib/InViewport'

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
  const markerRef = useRef<HTMLDivElement>(null)
  const endInView = useInViewport(markerRef)

  useEffect(() => {
    if (!hasNextPage || !endInView) return
    fetchNextPage()
  }, [ endInView ])

  return (
    <div>
      {children}
      {hasNextPage && <div ref={markerRef} />}
      {fetchingNextPage && <div style={{ textAlign: 'center', padding: '1rem' }}>Loading more!</div>}
    </div>
  )
}
