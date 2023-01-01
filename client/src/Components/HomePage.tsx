import { FC } from 'react'

import { AllPostsGallery } from './Gallery/Galleries/AllPostsGallery'
import { FeaturedPostsGallery } from './Gallery/Galleries/FeaturedPostsGallery'
import { PublicLayout } from './Layouts'

export const HomePage: FC = () => {
  return (
    <PublicLayout>
      <FeaturedPostsGallery />
      <AllPostsGallery />
    </PublicLayout>
  )
}
