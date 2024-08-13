import { Box, Paper, Stack, Typography } from '@mui/material'
import classnames from 'classnames'
import { FC } from 'react'

import { ImagesNav } from './PostImagesNav'
import { PostNav } from './PostNav'
import { PostTitle } from './PostTitle'
import { useViewPostCtrl } from '../../../../Controllers'
import { useIsMobile } from '../../../../Hooks'
import { AsyncImg, Markdown, PostTags } from '../../../BaseTheme'

import styles from './ViewPost.module.scss'

export const ViewPost: FC = () => {
  const isMobile = useIsMobile()
  const { post, ...ctrl } = useViewPostCtrl()
  const description = post.description || ''

  return (
    <Stack gap={2}>
      <PostTitle />

      <Box className={classnames(styles.postImage, { [styles.isMobile]: isMobile })}>
        <ImagesNav />
        <Box className={styles.imgWrapper}>
          <AsyncImg key={ctrl.currentImage.id} src={ctrl.currentImageSrc} onClick={ctrl.onPostImageClick} />
        </Box>
      </Box>

      <PostNav
        post={post}
        nextPost={ctrl.nextPost}
        prevPost={ctrl.prevPost}
        onPostChange={ctrl.onChangePost}
        onImageChange={ctrl.onChangeImage}
      />

      <Paper sx={{ padding: 2 }}>
        <Stack gap={2}>
          <Typography variant={'h3'}>Tags</Typography>
          <PostTags post={post} />
        </Stack>
      </Paper>

      {description?.trim() !== '' && (
        <Paper sx={{ padding: 2 }}>
          <Markdown>{post.description}</Markdown>
        </Paper>
      )}
    </Stack>
  )
}
