import { FC } from 'react'

import { PicturesApi } from '../../../Lib/ServerApi'
import { LoadingGate } from '../../../UI/LoadingGate'
import { Gallery, GallerySizes } from '../gallery'

export const FeaturedGallery: FC = () => {
  const { fetching, error, data = [] } = PicturesApi.useTag('Featured')

  return (
    <LoadingGate loading={fetching} error={error}>
      <Gallery title="Featured" pictures={data} gallerySize={GallerySizes.LARGE} />
    </LoadingGate>
  )
}
