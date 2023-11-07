import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box, Button, Paper, Stack } from '@mui/material'
import React, { FC, MouseEventHandler, useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { useNavigate } from 'react-router-dom'


import { PostNav } from './PostNav'
import { formatError } from '../../../Lib/FormatError'
import { useHotkey } from '../../../Lib/Hooks/UseHotkey'
import { AsyncImg } from '../../UI/AsyncImg'
import { Text } from '../../UI/Text'
import { useCurrentUser } from '../../User/UsersApi'
import { useRecordView } from '../../Views/ViewHooks'
import { PostData } from '../PostData'
import { PostPreloader } from '../PostPreloader'
import { useNextPost, usePost$, usePrevPost } from '../PostsApi'
import { PostTags } from '../PostTags'

import styles from './ViewPost.module.scss'

interface ViewPostProps {
  postId: PostData['id']
  onPostChange: (newPost: PostData) => void
}

export const ViewPost: FC<ViewPostProps> = ({
  postId,
  onPostChange,
}) => {
  const recordView = useRecordView()
  const navigate = useNavigate()
  const { data: currentUser } = useCurrentUser()
  const [ activeImageIndex, setActiveImageIndex ] = useState<number>(0)
  const { data: post, error, isPending, isError } = usePost$({ postId })

  const { data: nextPost } = useNextPost(postId)
  const { data: prevPost } = usePrevPost(postId)

  useEffect(() => setActiveImageIndex(0), [ postId ])

  const onNextPost = () => nextPost && onPostChange(nextPost)
  const onNextImage = () => {
    if (!post) return

    if (activeImageIndex < post.images.length - 1) {
      setActiveImageIndex(activeImageIndex + 1)
    }
  }

  const onPrevPost = () => prevPost && onPostChange(prevPost)
  const onPrevImage = () => {
    if (activeImageIndex > 0) {
      setActiveImageIndex(activeImageIndex - 1)
    }
  }

  const onEditPost: MouseEventHandler = (event) => {
    if (!post) return
    event.preventDefault()
    navigate(`/post/${post.id}/edit`)
  }

  useHotkey('ArrowLeft', onNextPost)
  useHotkey('ArrowRight', onPrevPost)
  useHotkey('ArrowDown', onNextImage)
  useHotkey('ArrowUp', onPrevImage)

  const onPrimaryImageClick: MouseEventHandler<HTMLDivElement> = (event) => {
    const clickTarget = event.currentTarget
    const clickTargetWidth = clickTarget.offsetWidth
    const xClick = event.clientX - clickTarget.getBoundingClientRect().left

    if (xClick < clickTargetWidth / 3) {
      onNextPost()
    } else {
      onPrevPost()
    }
  }

  if (isPending) {
    return <Paper>Loading...</Paper>
  } else if (isError) {
    return <Paper>Error Loading Post: {formatError(error)}</Paper>
  } else if (!post) {
    return <Paper>Unable to load post</Paper>
  }

  recordView(post.id)

  // Ensure the active og-injector is in range. It could be out of range due to the postId changing
  // and the og-injector not being updated yet
  const imageIndex: number = activeImageIndex >= post.images.length ? 0 : activeImageIndex
  const activeImage = post.images[imageIndex]

  const description = post.description || ''

  return (
    <>
      <Stack gap={2}>
        <Box className={styles.imgWrapper} onClick={onPrimaryImageClick}>
          <AsyncImg
            key={activeImage.id}
            src={activeImage.srcs.high}
          />
        </Box>

        <PostNav
          postId={postId}
          imageIndex={activeImageIndex}
          onPostChange={onPostChange}
          onImageChange={setActiveImageIndex}
        />

        <Paper sx={{ padding: 2 }}>
          <Stack gap={2}>
            <Stack direction="row" justifyContent="space-between">
              <Text variant="h2">{post.title}</Text>

              {(post && currentUser?.admin) && (
                <Box>
                  <Button
                    component="a"
                    variant="contained"
                    href={`/post/${post.id}/edit`}
                    onClick={onEditPost}
                    endIcon={<FontAwesomeIcon icon={faEdit} />}
                    size="small"
                  >
                    Edit
                  </Button>
                </Box>
              )}
            </Stack>

            <Stack direction="row" gap={2} alignItems="center" flexWrap="wrap">
              <PostTags post={post} />
            </Stack>
          </Stack>
        </Paper>

        {nextPost && (<PostPreloader postId={nextPost.id} imageSize="high" />)}
        {prevPost && (<PostPreloader postId={prevPost.id} imageSize="high" />)}

        {description?.trim() !== '' && (
          <Paper sx={{ padding: 2 }}>
            <ReactMarkdown>{post.description}</ReactMarkdown>
          </Paper>
        )}
      </Stack>
    </>
  )

}
