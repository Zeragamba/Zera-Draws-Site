import { FC, useEffect, useRef } from 'react'

import { Post } from '../../Lib/ServerApi'
import { noOp, useInViewport } from '../../Lib/util'
import { Glass } from '../UI/Glass'
import { GalleryImages } from './GalleryImages'
import { GalleryTitle } from './GalleryTitle'


export enum GallerySizes {
  SMALL = 250,
  LARGE = 300
}

type GalleryProps = {
  title?: string
  posts: Post[]
  gallerySize: GallerySizes
} & InfiniteProps

type InfiniteProps = {
  infinite?: boolean
  hasNextPage?: boolean
  fetchingNextPage?: boolean
  fetchNextPage?: () => void
}

export const Gallery: FC<GalleryProps> = ({
  posts,
  title,
  gallerySize,
  infinite = false,
  hasNextPage = false,
  fetchingNextPage = false,
  fetchNextPage = noOp,
}) => {
  const markerRef = useRef<HTMLDivElement>(null)
  const endInView = useInViewport(markerRef)

  useEffect(() => {
    if (!infinite || !hasNextPage || !endInView) return
    fetchNextPage()
  }, [ endInView ])

  return (
    <Glass>
      {title && (<GalleryTitle>{title}</GalleryTitle>)}
      <GalleryImages posts={posts} gallerySize={gallerySize} />
      {infinite && hasNextPage && <div ref={markerRef} />}
      {fetchingNextPage && <div style={{ textAlign: 'center', padding: '1rem' }}>Loading more!</div>}
    </Glass>
  )
}
