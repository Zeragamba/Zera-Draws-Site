import { FC } from 'react'

import { useRecentPictures } from '../../../Lib/ServerApi'
import { Glass } from '../../../UI/Glass'
import { Gallery, GallerySizes } from '../Gallery'


interface RecentGalleryProps {
  numImages?: number
}

export const RecentGallery: FC<RecentGalleryProps> = ({
  numImages = 5,
}) => {
  const picturesQuery = useRecentPictures({ numImages })

  if (picturesQuery.isError) {
    return <Glass>Error loading gallery. :(</Glass>
  } else if (picturesQuery.data) {
    return <Gallery title="Recent" pictures={picturesQuery.data} gallerySize={GallerySizes.SMALL} />
  } else {
    return <Glass>Loading...</Glass>
  }
}
