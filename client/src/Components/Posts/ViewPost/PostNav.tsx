import { faAngleDown, faAnglesLeft, faAnglesRight, faAngleUp } from '@fortawesome/free-solid-svg-icons'
import { Button, Paper, Stack, SxProps, Typography } from '@mui/material'
import React, { FC, MouseEventHandler, useState } from 'react'

import { useHotkey } from '../../../Lib/Hooks/UseHotkey'
import { FontAwesomeIcon } from '../../../Lib/Icons/FontAwesomeIcon'
import { AltImagesView } from '../../Images/AltImagesView'
import { ImageData } from '../../Images/ImageData'
import { usePageContext } from '../../Layouts/PageContext'
import { useIsMobile } from '../../UI/ScreenSize'
import { PostData } from '../PostData'
import { getPostUrl } from '../PostsApi'

import styles from '../../../Theme/ZeraDark/Post/ViewPost.module.scss'

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
  const [ imageIndex, setImageIndex ] = useState<number>(0)
  const { tagId, galleryId } = usePageContext()

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
      <div className={styles.nav}>
        <div>
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
        </div>

        {images.length > 1 && (
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
        )}

        <div>
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
        </div>
      </div>

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
        startIcon={<FontAwesomeIcon
          icon={faAngleUp}
        />}
        disabled={curImage <= 0}
        variant="contained"
      >
        Prev
      </Button>

      <Typography className="counter">
        {!isMobile && 'Image'} {curImage + 1} / {numImages}
      </Typography>

      <Button
        className="next"
        onClick={onNextImageClick}
        endIcon={<FontAwesomeIcon
          icon={faAngleDown}
        />}
        disabled={curImage >= numImages - 1}
        variant="contained"
      >
        Next
      </Button>
    </Paper>
  )
}
