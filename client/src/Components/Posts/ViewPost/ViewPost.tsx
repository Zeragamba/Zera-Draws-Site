import { faEdit, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box, Button, Paper, Stack } from '@mui/material'
import { isError } from '@tanstack/react-query'
import React, { FC, MouseEventHandler, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useHotkey } from '../../../Lib/Hooks/UseHotkey'
import { Gallery } from '../../Gallery/Gallery'
import { GalleryItem } from '../../Gallery/GalleryItem'
import { ImagePreloader } from '../../Images/ImagePreloader'
import { AsyncImg } from '../../UI/AsyncImg'
import { Glass } from '../../UI/Glass'
import { Text } from '../../UI/Text'
import { useCurrentUser } from '../../User/UsersApi'
import { Post } from '../Post'
import { PostPreloader } from '../PostPreloader'
import { useNextPost, usePost, usePrevPost } from '../PostsApi'
import { PostNav } from './PostNav'

import styles from './ViewPost.module.scss'

interface ViewPostProps {
  postId: Post['id']
  onPostChange: (newPost: Post) => void
}

export const ViewPost: FC<ViewPostProps> = ({
  postId,
  onPostChange,
}) => {
  const navigate = useNavigate()
  const { data: currentUser } = useCurrentUser()
  const [ activeImageIndex, setActiveImageIndex ] = useState<number>(0)
  const { data: post, error, isLoading, isError } = usePost({ postId })

  const { data: nextPost } = useNextPost({ postId })
  const { data: prevPost } = usePrevPost({ postId })

  useEffect(() => setActiveImageIndex(0), [ postId ])

  const onNextPost = () => nextPost && onPostChange(nextPost)
  const onNextImage = () => {
    if (activeImageIndex < post!.images.length - 1) {
      setActiveImageIndex(activeImageIndex + 1)
    } else {
      onPrevPost()
    }
  }

  const onPrevPost = () => prevPost && onPostChange(prevPost)
  const onPrevImage = () => {
    if (activeImageIndex > 0) {
      setActiveImageIndex(activeImageIndex - 1)
    } else {
      onNextPost()
    }
  }

  const onEditPost: MouseEventHandler = (event) => {
    if (!post) return
    event.preventDefault()
    navigate(`/post/${post.id}/edit`)
  }

  useHotkey('ArrowLeft', onNextPost)
  useHotkey('ArrowRight', onPrevPost)

  const onPrimaryImageClick: MouseEventHandler<HTMLDivElement> = (event) => {
    const clickTarget = event.currentTarget
    const clickTargetWidth = clickTarget.offsetWidth
    const xCoordInClickTarget = event.clientX - clickTarget.getBoundingClientRect().left

    if (clickTargetWidth / 2 > xCoordInClickTarget) {
      onPrevImage()
    } else {
      onNextImage()
    }
  }

  if (isLoading) {
    return <Glass>Loading...</Glass>
  } else if (isError) {
    return <Glass>Error Loading Post :( {formatError(error)}</Glass>
  } else if (!post) {
    return <Glass>Unable to load post</Glass>
  }

  // Ensure the active index is in range. It could be out of range due to the postId changing
  // and the index not being updated yet
  const imageIndex: number = activeImageIndex >= post.images.length ? 0 : activeImageIndex
  const activeImage = post.images[imageIndex]

  const tags = post.tags
    .map(tag => tag.name)
    .sort((a, b) => a.localeCompare(b))

  const description = post.description || ''

  return (
    <>
      <Glass className={styles.section}>
        <Stack direction="row">
          <Box sx={{ flexGrow: 1 }}>
            <div className={styles.title}>
              {!post.released && <FontAwesomeIcon icon={faEyeSlash} title="Private" />}
              {' '}
              <Text variant="h2">{post.title}</Text>
            </div>
            <Text variant="subtitle1">{post.date}</Text>
          </Box>

          <Box sx={{ alignSelf: 'center' }}>
            {(post && currentUser?.admin) && (
              <Button
                component="a"
                href={`/post/${post.id}/edit`}
                onClick={onEditPost}
                endIcon={<FontAwesomeIcon icon={faEdit} />}
              >
                Edit
              </Button>
            )}
          </Box>
        </Stack>
      </Glass>

      <PostNav postId={postId} onNextPost={onNextPost} onPrevPost={onPrevPost} />
      {nextPost && (<PostPreloader postId={nextPost.id} />)}
      {prevPost && (<PostPreloader postId={prevPost.id} />)}

      <Glass className={styles.imgWrapper} padding={0} onClick={onPrimaryImageClick}>
        <AsyncImg src={activeImage.srcs.high} />
      </Glass>

      {post.images.length >= 2 && (
        <Glass padding={0}>
          <Gallery>
            {post.images.map((image, index) => (
              <React.Fragment key={image.id}>
                <GalleryItem image={image} released={true} onClick={() => setActiveImageIndex(index)} />
                <ImagePreloader image={image} size="high" />
              </React.Fragment>
            ))}
          </Gallery>
        </Glass>
      )}

      {description?.trim() !== '' && (
        <Paper sx={{ padding: 2 }}>
          <Text>{post.description}</Text>
        </Paper>
      )}

      {tags.length > 0 && (
        <Paper sx={{ padding: 2 }}>
          <Text>{tags.join(', ')}</Text>
        </Paper>
      )}
    </>
  )

}

function formatError(error: unknown): string {
  if (isError(error)) return error.toString()
  return `${error}`
}
