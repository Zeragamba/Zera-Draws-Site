import { faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { Box, SxProps, Typography } from '@mui/material'
import { FC, MouseEventHandler, ReactNode } from 'react'
import { Link } from 'react-router-dom'

import { useGalleryContext } from './GalleryContext'
import { useInViewport } from '../../../../Hooks'
import { FontAwesomeIcon } from '../../../../Lib'
import { ImageData } from '../../../../Models'
import { AsyncImg } from '../Images'

interface GalleryItemProps {
  image: ImageData
  title?: string
  date?: string
  released?: boolean
  linkTo?: string
  onClick?: MouseEventHandler
}

export const GalleryItem: FC<GalleryItemProps> = ({
  image,
  title,
  released,
  linkTo,
  onClick,
}) => {
  const galleryConfig = useGalleryContext()
  const [ wrapperRef, inViewport ] = useInViewport()

  const ItemStyles: SxProps = {
    height: galleryConfig.rowHeight,
    position: 'relative',
    display: 'inline-flex',
    overflow: 'hidden',
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center',
    cursor: onClick ? 'pointer' : undefined,

    '&:hover': {
      '.image': { padding: 1 },
      '.metadataTop': { top: 0 },
      '.metadataBottom': { bottom: 0 },
    },

    '.image': {
      width: '100%',
      height: '100%',
      padding: 0,
      transition: 'padding 200ms',
    },

    '.imgElement': {
      width: '100%',
      height: '100%',

      objectFit: 'cover',
      objectPosition: 'top',
      background: 'gray',
    },
  }

  const imgEle = (
    <>
      {inViewport && (
        <AsyncImg className="imgElement" src={image.srcs.gallery || image.srcs.full} alt={title} />
      )}
    </>
  )

  return (
    <Box sx={ItemStyles} ref={wrapperRef}>
      {linkTo ? (
        <Link to={linkTo} className="image" onClick={onClick}>{imgEle}</Link>
      ) : (
        <div className="image" onClick={onClick}>{imgEle}</div>
      )}
      {!released && <PrivateMarker />}

      {title && (
        <ItemMetadata location="bottom">
          <Typography>{title}</Typography>
        </ItemMetadata>
      )}
    </Box>
  )
}

const PrivateMarker: FC = () => {
  const styles: SxProps = {
    position: 'absolute',
    bottom: 0,
    padding: 1,
    color: 'black',
    backgroundColor: 'lightgrey',
    borderTopRightRadius: '8px',
    borderTopLeftRadius: '8px',
  }

  return (
    <Box sx={styles}>
      <FontAwesomeIcon icon={faEyeSlash} /> Private
    </Box>
  )
}

interface ItemMetaDataProps {
  location: 'top' | 'bottom'
  children: ReactNode
}

const ItemMetadata: FC<ItemMetaDataProps> = ({
  location,
  children,
}) => {
  const styles: SxProps = {
    zIndex: '10',
    position: 'absolute',
    width: '100%',
    padding: 1,
    transition: 'top 250ms ease, bottom 250ms ease',
    color: 'hsl(0, 0%, 10%)',
    background: 'hsla(0, 100%, 100%, 0.75)',

    '&.metadataTop': { top: '-100%' },
    '&.metadataBottom': { bottom: '-100%' },
  }

  return (
    <Box sx={styles} className={location === 'top' ? 'metadataTop' : 'metadataBottom'}>
      {children}
    </Box>
  )
}
