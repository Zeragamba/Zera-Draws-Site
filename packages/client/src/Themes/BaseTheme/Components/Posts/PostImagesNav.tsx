import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { Button, Paper, SxProps, Typography } from '@mui/material'
import { FC } from 'react'

import { usePostImageCtrl } from '../../../../Controllers'
import { useHotkey, useIsMobile } from '../../../../Hooks'
import { FontAwesomeIcon } from '../../../../Lib'

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

export const ImagesNav: FC = () => {
  const isMobile = useIsMobile()
  const postImageCtrl = usePostImageCtrl()

  useHotkey('ArrowDown', () => postImageCtrl.onNextImage())
  useHotkey('ArrowUp', () => postImageCtrl.onPrevImage())

  if (postImageCtrl.totalImages === 1) return null

  return (
    <Paper sx={styles}>
      <Button
        className="prev"
        variant="text"
        disabled={!postImageCtrl.hasPrevImage}
        onClick={(event) => {
          event.preventDefault()
          postImageCtrl.onPrevImage()
        }}
      >
        <FontAwesomeIcon icon={faAngleLeft} />
      </Button>

      <Typography className="counter">
        {!isMobile && 'Image'} {postImageCtrl.currentImageNum} / {postImageCtrl.totalImages}
      </Typography>

      <Button
        className="next"
        variant="text"
        disabled={!postImageCtrl.hasNextImage}
        onClick={(event) => {
          event.preventDefault()
          postImageCtrl.onNextImage()
        }}
      >
        <FontAwesomeIcon icon={faAngleRight} />
      </Button>
    </Paper>
  )
}
