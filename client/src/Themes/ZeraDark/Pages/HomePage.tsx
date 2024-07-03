import Stack from '@mui/material/Stack'
import { FC } from 'react'

import { AllPostsGallery, FeaturedPostsGallery } from '../../BaseTheme'

export const HomePage: FC = () => {
  return (
    <Stack gap={3}>
      <FeaturedPostsGallery title="Featured" maxRows={1} />
      <AllPostsGallery title="Latest" />
    </Stack>
  )
}
