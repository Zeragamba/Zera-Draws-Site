import { FC, ReactNode } from 'react'

import styles from './GalleryTitle.module.scss'

interface GalleryTitleProps {
  children: ReactNode
}

export const GalleryTitle: FC<GalleryTitleProps> = ({
  children,
}) => {
  return (
    <div className={styles.title}>{children}</div>
  )
}
