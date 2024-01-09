import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { Box, Button, Paper, Stack, Typography } from '@mui/material'
import React, { FC } from 'react'
import ReactMarkdown from 'react-markdown'

import { PostNav } from './PostNav'
import { PostTags } from './PostTags'
import { AsyncImg, FontAwesomeIcon, PostData, useIsAdmin, useViewPost } from '../../../Lib'
import { Text } from '../../../Lib/UI/Text'

import styles from './ViewPost.module.scss'

interface ViewPostProps {
  post: PostData
  onPostChange: (newPost: PostData) => void
}

export const ViewPost: FC<ViewPostProps> = ({
  post,
  onPostChange,
}) => {
  const ctrl = useViewPost({ post, onPostChange })
  const isAdmin = useIsAdmin()

  const description = post.description || ''

  return (
    <>
      <Stack gap={2}>

        <Paper sx={{ padding: 2 }}>
          <Stack gap={2}>
            <Stack direction="row" justifyContent="space-between">
              <Text variant="h2">{post.title}</Text>

              {isAdmin && (
                <Box>
                  <Button
                    component="a"
                    variant="contained"
                    href={`/post/${post.id}/edit`}
                    onClick={(event) => {
                      event.preventDefault()
                      ctrl.onEdit()
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

        <Box className={styles.imgWrapper} onClick={ctrl.onImageClick}>
          <AsyncImg src={ctrl.currentImageSrc} />
        </Box>

        <PostNav
          post={post}
          nextPost={ctrl.nextPost}
          prevPost={ctrl.prevPost}
          onPostChange={onPostChange}
          onImageChange={ctrl.setCurrentImage}
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
    </>
  )
}
