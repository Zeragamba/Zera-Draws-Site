import { FC } from 'react'

import { TaggedPostsGallery } from './Gallery/Galleries/TaggedPostsGallery'
import { PublicLayout } from './Layouts'

export const HomePage: FC = () => {
  return (
    <PublicLayout>
      <TaggedPostsGallery tagId="featured" />
    </PublicLayout>
  )
}
