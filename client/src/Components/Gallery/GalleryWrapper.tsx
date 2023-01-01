import { FC, ReactNode } from 'react'

import { GalleryContextProvider } from './GalleryContext'

import styles from './Gallery.module.scss'

export interface GalleryProps {
  children: ReactNode
  rowHeight?: number
}

export const GalleryWrapper: FC<GalleryProps> = ({
  children,
  rowHeight = 250,
}) => {
  return (
    <GalleryContextProvider config={{ rowHeight }}>
      <div className={styles.row}>
        {children}
      </div>
    </GalleryContextProvider>
  )
}
