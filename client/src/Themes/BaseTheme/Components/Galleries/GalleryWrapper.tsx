import { FC, ReactNode, useRef } from 'react'

import { GalleryContextProvider } from './GalleryContext'
import { useContainerDimensions } from '../../../../Lib'
import { StyleProp } from '../../../ZeraDark/MuiTheme'

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

  const gallerySize: StyleProp = {
    '--gallery-cols': Math.floor(width / rowHeight),
    '--gallery-row-height': rowHeight + 'px',
  }

  return (
    <GalleryContextProvider config={{ rowHeight }}>
      <div className={styles.row} ref={galleryRef} style={gallerySize}>
        {children}
      </div>
    </GalleryContextProvider>
  )
}
