import { FC, ReactNode, useRef } from 'react'

import { GalleryContextProvider } from './GalleryContext'
import { StyleProp, useContainerDimensions } from '../../../Lib'

import styles from './GalleryWrapper.module.scss'

export interface GalleryProps {
  children: ReactNode
  rowHeight?: number
}

export const GalleryWrapper: FC<GalleryProps> = ({
  children,
  rowHeight = 250,
}) => {
  const galleryRef = useRef<HTMLDivElement>(null)
  const { width } = useContainerDimensions(galleryRef)

  const ratio = Math.sqrt(2)
  const itemWidth = rowHeight / ratio

  const gallerySize: StyleProp = {
    '--gallery-cols': Math.floor(width / itemWidth),
  }

  return (
    <GalleryContextProvider config={{ rowHeight }}>
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <div className={styles.row} ref={galleryRef} style={gallerySize}>
        {children}
      </div>
    </GalleryContextProvider>
  )
}
