import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { Box, Button, Paper, Stack, Typography } from '@mui/material'
import React, { FC } from 'react'
import ReactMarkdown from 'react-markdown'

import { PostNav } from './PostNav'
import { PostTags } from './PostTags'
import { FontAwesomeIcon, PostData, useViewPostCtrl } from '../../../../Lib'
import { AsyncImg } from '../Images'

import styles from './ViewPost.module.scss'

interface ViewPostProps {
  post: PostData
  onPostChange: (newPost: PostData) => void
}

export const ViewPost: FC<ViewPostProps> = ({
  post,
  onPostChange,
}) => {
  const ctrl = useViewPostCtrl()
  const description = post.description || ''

  return (
    <Stack gap={2}>
      <Paper sx={{ padding: 2 }}>
        <Stack gap={2}>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="h2">{post.title}</Typography>

            {ctrl.canEdit && (
              <Box>
                <Button
                  component="a"
                  variant="contained"
                  href={`/post/${post.id}/edit`}
                  onClick={(event) => {
                    event.preventDefault()
                    ctrl.onEditPost()
                  }}
                  endIcon={<FontAwesomeIcon icon={faEdit} />}
                  size="small"
                >
                  Edit
                </Button>
              </Box>
            )}
          </Stack>
        </Stack>
      </Paper>

      <Box className={styles.imgWrapper} onClick={ctrl.onPostImageClick}>
        <AsyncImg key={ctrl.currentImage.id} src={ctrl.currentImageSrc} />
      </Box>

      <PostNav
        post={post}
        nextPost={ctrl.nextPost}
        prevPost={ctrl.prevPost}
        onPostChange={onPostChange}
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
          <ReactMarkdown>{post.description}</ReactMarkdown>
        </Paper>
      )}
    </Stack>
  )
}
