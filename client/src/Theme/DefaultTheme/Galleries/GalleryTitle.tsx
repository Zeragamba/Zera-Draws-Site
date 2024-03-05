import { FC, ReactNode } from 'react'

import { Text } from '../../../Lib/UI/Text'

interface GalleryTitleProps {
  children: ReactNode
}

export const GalleryTitle: FC<GalleryTitleProps> = ({
  children,
}) => {
  return (
    <Text variant="h2" sx={{ padding: 2 }}>{children}</Text>
  )
}
