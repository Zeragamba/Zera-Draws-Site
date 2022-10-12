import { FC, useEffect, useRef } from 'react'

import { Picture } from '../../Lib/ServerApi/Models'
import { noOp, useInViewport } from '../../Lib/util'
import { Glass } from '../../UI/Glass'
import { GalleryImages } from './GalleryImages'
import { GalleryTitle } from './GalleryTitle'


export enum GallerySizes {
  SMALL = 250,
  LARGE = 300
}

type GalleryProps = {
  title?: string
  pictures: Picture[]
  gallerySize: GallerySizes
} & InfiniteProps

type InfiniteProps = {
  infinite?: boolean
  hasNextPage?: boolean
  fetchingNextPage?: boolean
  fetchNextPage?: () => void
}

export const Gallery: FC<GalleryProps> = ({
  pictures,
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
      <GalleryImages pictures={pictures} gallerySize={gallerySize} />
      {infinite && hasNextPage && <div ref={markerRef} />}
      {fetchingNextPage && <div style={{ textAlign: 'center', padding: '1rem' }}>Loading more!</div>}
    </Glass>
  )
}
