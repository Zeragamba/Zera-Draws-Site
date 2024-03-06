import { faAngleLeft, faAngleRight, faAnglesLeft, faAnglesRight } from '@fortawesome/free-solid-svg-icons'
import { Box, Button, Paper, Stack, SxProps, Typography } from '@mui/material'
import classnames from 'classnames'
import React, { FC, MouseEventHandler, useEffect, useState } from 'react'


import { FontAwesomeIcon, getPostUrl, ImageData, PostData, useHotkey, useIsMobile } from '../../../../Lib'
import { usePageContext } from '../../Layouts'
import { AltImagesView } from '../Images'

import styles from './ViewPost.module.scss'

interface PostNavProps {
  post: PostData
  nextPost?: PostData
  prevPost?: PostData
  onPostChange: (post: PostData) => void
  onImageChange: (image: ImageData) => void
}

export const PostNav: FC<PostNavProps> = ({
  post,
  nextPost,
  prevPost,
  onPostChange,
  onImageChange,
}) => {
  const isMobile = useIsMobile()
  const [ imageIndex, setImageIndex ] = useState<number>(0)
  const { tagId, galleryId } = usePageContext()

  useEffect(() => setImageIndex(0), [ post ])

  const images = post.images

  const onPrevImage = () => onImageIndexChange(imageIndex - 1)
  const onPrevPost = () => prevPost && onPostChange(prevPost)
  const onPrevPostClick: MouseEventHandler = (event) => {
    event.preventDefault()
    onPrevPost()
  }

  const onNextImage = () => onImageIndexChange(imageIndex + 1)
  const onNextPost = () => nextPost && onPostChange(nextPost)
  const onNextPostClick: MouseEventHandler = (event) => {
    event.preventDefault()
    onNextPost()
  }

  const onImageIndexChange = (newIndex: number) => {
    if (newIndex <= 0) newIndex = 0
    if (newIndex >= images.length - 1) newIndex = images.length - 1

    onImageChange(images[newIndex])
    setImageIndex(newIndex)
  }

  useHotkey('ArrowLeft', () => onNextPost())
  useHotkey('ArrowRight', () => onPrevPost())
  useHotkey('ArrowDown', () => onNextImage())
  useHotkey('ArrowUp', () => onPrevImage())

  return (
    <Stack gap={2}>
      <Box className={classnames(styles.nav, { [styles.mobile]: isMobile })}>
        <Box className={styles.nextPost}>
          <Button
            component="a"
            href={nextPost ? getPostUrl({ postId: nextPost.slug, tagId, galleryId }) : '/'}
            onClick={onNextPostClick}
            variant="contained"
            startIcon={<FontAwesomeIcon icon={faAnglesLeft} />}
            disabled={!nextPost}
          >
            Next
          </Button>
        </Box>

        {images.length > 1 && (
          <Box className={styles.imageNav}>
            <ImagesNav
              curImage={imageIndex}
              numImages={images.length}
              onPrevImageClick={(event) => {
                event.preventDefault()
                onImageIndexChange(imageIndex - 1)
              }}
              onNextImageClick={(event) => {
                event.preventDefault()
                onImageIndexChange(imageIndex + 1)
              }}
            />
          </Box>
        )}

        <Box className={styles.prevPost}>
          <Button
            component="a"
            href={prevPost ? getPostUrl({ postId: prevPost.slug, tagId, galleryId }) : '/'}
            onClick={onPrevPostClick}
            variant="contained"
            endIcon={<FontAwesomeIcon icon={faAnglesRight} />}
            disabled={!prevPost}
          >
            Prev
          </Button>
        </Box>
      </Box>

      {images.length > 1 && (
        <AltImagesView
          images={images}
          onImageClick={onImageIndexChange}
          activeIndex={imageIndex}
        />
      )}
    </Stack>
  )
}

interface ImagesNavProps {
  curImage: number
  numImages: number
  onPrevImageClick: MouseEventHandler
  onNextImageClick: MouseEventHandler
}

export const ImagesNav: FC<ImagesNavProps> = ({
  curImage,
  numImages,
  onPrevImageClick,
  onNextImageClick,
}) => {
  const isMobile = useIsMobile()

  const styles: SxProps = {
    display: 'grid',
    gridTemplateRows: 'auto',
    gridTemplateColumns: 'auto auto auto',
    gridTemplateAreas: [
      '"prev counter next"',
    ].join(' '),

    '.prev': {
      gridArea: 'prev',
    },

    '.counter': {
      gridArea: 'counter',
      textTransform: 'uppercase',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      paddingLeft: 2,
      paddingRight: 2,
      whiteSpace: 'nowrap',
    },

    '.next': {
      gridArea: 'next',
    },
  }

  return (
    <Paper sx={styles}>
      <Button
        className="prev"
        onClick={onPrevImageClick}
        disabled={curImage <= 0}
        variant="text"
      >
        <FontAwesomeIcon icon={faAngleLeft} />
      </Button>

      <Typography className="counter">
        {!isMobile && 'Image'} {curImage + 1} / {numImages}
      </Typography>

      <Button
        className="next"
        onClick={onNextImageClick}
        disabled={curImage >= numImages - 1}
        variant="text"
      >
        <FontAwesomeIcon icon={faAngleRight} />
      </Button>
    </Paper>
  )
}
