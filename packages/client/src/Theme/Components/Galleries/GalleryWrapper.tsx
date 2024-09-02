import { FC, Fragment, ReactNode, useRef } from "react"

import { useContainerDimensions } from "../../../Hooks"
import { StyleProp } from "../../MuiTheme"
import { GalleryProvider } from "../../../Lib"

import styles from "./GalleryWrapper.module.scss"

export interface GalleryWrapperProps {
  children: ReactNode[]
  rowHeight?: number
  maxRows?: number
}

export const GalleryWrapper: FC<GalleryWrapperProps> = ({
  children,
  rowHeight = 250,
  maxRows = Infinity,
}) => {
  const galleryRef = useRef<HTMLDivElement>(null)
  const { width } = useContainerDimensions(galleryRef)

  const numColumns = Math.floor(width / rowHeight)
  const maxItems = numColumns * maxRows

  const gallerySize: StyleProp = {
    "--gallery-cols": numColumns,
    "--gallery-row-height": rowHeight + "px",
  }

  return (
    <GalleryProvider config={{ rowHeight }}>
      <div className={styles.row} ref={galleryRef} style={gallerySize}>
        {children.slice(0, maxItems).map((child, index) => (
          <Fragment key={index}>{child}</Fragment>
        ))}
      </div>
    </GalleryProvider>
  )
}
