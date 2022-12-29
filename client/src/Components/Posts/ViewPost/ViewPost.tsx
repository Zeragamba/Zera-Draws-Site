import { faAnglesLeft, faAnglesRight, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from '@mui/material'
import { isError } from '@tanstack/react-query'
import classnames from 'classnames'
import React, { FC, MouseEventHandler, useEffect, useState } from 'react'

import { useHotkey } from '../../../Lib/Hooks/UseHotkey'
import { Gallery } from '../../Gallery/Gallery'
import { GalleryItem } from '../../Gallery/GalleryItem'
import { ImagePreloader } from '../../Images/ImagePreloader'
import { AsyncImg } from '../../UI/AsyncImg'
import { Glass } from '../../UI/Glass'
import { Post } from '../Post'
import { PostPreloader } from '../PostPreloader'
import { useNextPost, usePost, usePrevPost } from '../PostsApi'

import styles from './ViewPost.module.scss'

interface ViewPostProps {
  postId: Post['id']
  onPostChange: (newPost: Post) => void
}

export const ViewPost: FC<ViewPostProps> = ({
  postId,
  onPostChange,
}) => {
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
      <Glass className={styles.imgWrapper} padding={0} onClick={onPrimaryImageClick}>
        <AsyncImg src={activeImage.srcs.high} />
      </Glass>

      {post.images.length >= 2 && (
        <Glass className={styles.section}>
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

      {(prevPost || nextPost) && (
        <Glass className={classnames(styles.section, styles.nav)}>
          <div>
            {nextPost && (
              <>
                <Button onClick={onNextPost} startIcon={<FontAwesomeIcon icon={faAnglesLeft} />}>
                  Next
                </Button>
                <PostPreloader postId={nextPost.id} />
              </>
            )}
          </div>

          <div>
            {prevPost && (
              <>
                <Button onClick={onPrevPost} endIcon={<FontAwesomeIcon icon={faAnglesRight} />}>
                  Prev
                </Button>
                <PostPreloader postId={prevPost.id} />
              </>
            )}
          </div>
        </Glass>
      )}

      <Glass className={styles.section}>
        <div>
          <div className={styles.title}>
            {!post.released && <FontAwesomeIcon icon={faEyeSlash} title="Private" />}
            {' '}
            {post.title}
          </div>
          <div className={styles.date}>{post.date}</div>
        </div>

        {tags.length > 0 && <div className={styles.tags}>{tags.join(', ')}</div>}
        {description.trim() !== '' && <div className={styles.description}>{post.description}</div>}
      </Glass>
    </>
  )

}

function formatError(error: unknown): string {
  if (isError(error)) return error.toString()
  return `${error}`
}
