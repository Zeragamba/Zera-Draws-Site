import { FC } from 'react'

import { useAllPictures } from '../../../Lib/ServerApi'
import { Glass } from '../../../UI/Glass'
import { Gallery, GallerySizes } from '../Gallery'

export const AllPicturesGallery: FC = () => {
  const picturesQuery = useAllPictures()
  const onFetchNextPage = () => picturesQuery.fetchNextPage()

  if (picturesQuery.isError) {
    return <Glass>Error loading gallery. :(</Glass>
  } else if (picturesQuery.data) {
    const pictures = picturesQuery.data.pages.flat()
    return <Gallery
      title="All"
      pictures={pictures}
      gallerySize={GallerySizes.SMALL}
      infinite
      fetchingNextPage={picturesQuery.isFetchingNextPage}
      hasNextPage={picturesQuery.hasNextPage}
      fetchNextPage={onFetchNextPage}
    />
  } else {
    return <Glass>Loading...</Glass>
  }
}
