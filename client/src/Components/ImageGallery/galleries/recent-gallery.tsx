import { FC } from 'react'

import { PicturesApi } from '../../../Lib/ServerApi'
import { LoadingGate } from '../../UI/LoadingGate'
import { Gallery, GallerySizes } from '../gallery'

export const RecentGallery: FC = () => {
  const { fetching, error, data = [] } = PicturesApi.useRecent()

  return (
    <LoadingGate loading={fetching} error={error}>
      <Gallery title="Recent" pictures={data} gallerySize={GallerySizes.SMALL} />
    </LoadingGate>
  )
}
