import { faAngleDown, faAnglesLeft, faAnglesRight, faAngleUp, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Paper, SxProps, Typography } from '@mui/material'
import React, { FC, MouseEventHandler } from 'react'

import { noop } from '../../../Lib/Noop'
import { usePageContext } from '../../Layouts/PageContext'
import { useIsMobile } from '../../UI/ScreenSize'
import { PostData } from '../PostData'
import { getPostUrl, useNextPost, usePost$, usePrevPost } from '../PostsApi'

import styles from './ViewPost.module.scss'

interface PostNavProps {
  postId: PostData['id']
  imageIndex?: number
  onPostChange: (post: PostData) => void
  onImageChange?: (index: number) => void
}

export const PostNav: FC<PostNavProps> = ({
  postId,
  imageIndex = 0,
  onPostChange,
  onImageChange = noop,
}) => {
  const { tagId, galleryId } = usePageContext()
  const { data: curPost } = usePost$({ postId })
  const { data: nextPost, isPending: nextPending } = useNextPost(postId)
  const { data: prevPost, isPending: prevPending } = usePrevPost(postId)
  const numImages = curPost?.images?.length || 1

  const onPrevPostClick: MouseEventHandler = (event) => {
    if (!prevPost) return
    event.preventDefault()
    onPostChange(prevPost)
  }

  const onNextPostClick: MouseEventHandler = (event) => {
    if (!nextPost) return
    event.preventDefault()
    onPostChange(nextPost)
  }

  const onPrevImageClick: MouseEventHandler = (event) => {
    event.preventDefault()
    if (imageIndex <= 0) return
    onImageChange(imageIndex - 1)
  }

  const onNextImageClick: MouseEventHandler = (event) => {
    event.preventDefault()
    if (imageIndex >= numImages - 1) return
    onImageChange(imageIndex + 1)
  }


  return (
    <div className={styles.nav}>
      <div>
        <Button
          component="a"
          href={nextPost ? getPostUrl({ postId: nextPost.slug, tagId, galleryId }) : '/'}
          onClick={onNextPostClick}
          variant="contained"
          startIcon={<FontAwesomeIcon icon={nextPending ? faSpinner : faAnglesLeft} spin={nextPending} />}
          disabled={!nextPost}
        >
          Next
        </Button>
      </div>

      {numImages > 1 && (
        <ImagesNav
          curImage={imageIndex}
          numImages={numImages}
          onPrevImageClick={onPrevImageClick}
          onNextImageClick={onNextImageClick}
        />
      )}

      <div>
        <Button
          component="a"
          href={prevPost ? getPostUrl({ postId: prevPost.slug, tagId, galleryId }) : '/'}
          onClick={onPrevPostClick}
          variant="contained"
          endIcon={<FontAwesomeIcon icon={prevPending ? faSpinner : faAnglesRight} spin={prevPending} />}
          disabled={!prevPost}
        >
          Prev
        </Button>
      </div>
    </div>
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
