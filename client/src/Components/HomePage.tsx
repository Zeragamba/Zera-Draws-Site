import { FC } from 'react'

import { AllPostsGallery } from './Gallery/Galleries/AllPostsGallery'
import { PublicLayout } from './Layouts'

export const HomePage: FC = () => {
  return (
    <PublicLayout>
      <AllPostsGallery />
    </PublicLayout>
  )
}
