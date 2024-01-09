import { FC } from 'react'

import { AllPostsGallery } from './Galleries/AllPostsGallery'
import { PublicLayout } from './Layout'

export const HomePage: FC = () => {
  return (
    <PublicLayout>
      <AllPostsGallery />
    </PublicLayout>
  )
}
