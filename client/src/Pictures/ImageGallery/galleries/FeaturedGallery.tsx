import { FC } from 'react'

import { useGalleryPictures } from '../../../Lib/ServerApi'
import { Glass } from '../../../UI/Glass'
import { Gallery, GallerySizes } from '../Gallery'

export const FeaturedGallery: FC = () => {
  const picturesQuery = useGalleryPictures({ gallery: 'featured' })

  if (picturesQuery.isError) {
    return <Glass>Error loading gallery. :(</Glass>
  } else if (picturesQuery.data) {
    const pictures = picturesQuery.data.pages.flat()
    return <Gallery title="Featured" pictures={pictures} gallerySize={GallerySizes.LARGE} />
  } else {
    return <Glass>Loading...</Glass>
  }
}
