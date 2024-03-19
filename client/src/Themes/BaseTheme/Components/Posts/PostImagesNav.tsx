import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { Button, Paper, SxProps, Typography } from '@mui/material'
import React, { FC } from 'react'

import { usePostImageCtrl } from '../../../../Controllers'
import { FontAwesomeIcon, useHotkey, useIsMobile } from '../../../../Lib'

export const ImagesNav: FC = () => {
  const isMobile = useIsMobile()
  const postImageCtrl = usePostImageCtrl()

  useHotkey('ArrowDown', () => postImageCtrl.onNextImage())
  useHotkey('ArrowUp', () => postImageCtrl.onPrevImage())

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
