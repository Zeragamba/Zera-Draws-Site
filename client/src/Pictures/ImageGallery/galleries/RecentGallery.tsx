import { FC } from 'react'

import { PicturesApi } from '../../../Lib/ServerApi'
import { LoadingGate } from '../../../UI/LoadingGate'
import { Gallery, GallerySizes } from '../gallery'


interface RecentGalleryProps {
  numImages?: number
}

export const RecentGallery: FC<RecentGalleryProps> = ({
  numImages = 5,
}) => {
  const { fetching, error, data = [] } = PicturesApi.useRecent({ numImages })

  return (
    <LoadingGate loading={fetching} error={error}>
      <Gallery title="Recent" pictures={data} gallerySize={GallerySizes.SMALL} />
    </LoadingGate>
  )
}
