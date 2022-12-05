import { FC } from 'react'

import { AllPostsGallery } from '../Components/Gallery/Galleries/AllPostsGallery'
import { FeaturedGallery } from '../Components/Gallery/Galleries/FeaturedGallery'
import { PublicLayout } from '../Components/Layouts'

export const HomePage: FC = () => (
  <PublicLayout>
    <FeaturedGallery />
    <AllPostsGallery />
  </PublicLayout>
)
