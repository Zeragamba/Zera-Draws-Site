import { FC } from 'react'

import { AllPostsGallery } from './Gallery/Galleries/AllPostsGallery'
import { FeaturedGallery } from './Gallery/Galleries/FeaturedGallery'
import { PublicLayout } from './Layouts'

export const HomePage: FC = () => (
  <PublicLayout>
    <FeaturedGallery />
    <AllPostsGallery />
  </PublicLayout>
)
