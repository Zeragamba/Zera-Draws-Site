import { FC } from 'react'

import { PicturesApi } from '../../../Lib/ServerApi'
import { LoadingGate } from '../../../UI/LoadingGate'
import { Gallery, GallerySizes } from '../gallery'

export const AllPicturesGallery: FC = () => {
  const { fetching, error, data = [] } = PicturesApi.useAll()

  return (
    <LoadingGate loading={fetching} error={error}>
      <Gallery title="All" pictures={data} gallerySize={GallerySizes.SMALL}/>
    </LoadingGate>
  )
}
