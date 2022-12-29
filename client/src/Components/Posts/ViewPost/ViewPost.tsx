import { faAnglesLeft, faAnglesRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from '@mui/material'
import { isError } from '@tanstack/react-query'
import classnames from 'classnames'
import React, { FC, MouseEventHandler, useState } from 'react'

import { useHistory } from '../../../App/AppRouter'
import { useHotkey } from '../../../Lib/Hooks/UseHotkey'
import { AsyncImg } from '../../UI/AsyncImg'
import { Glass } from '../../UI/Glass'
import { Post } from '../Post'
import { PostPreloader } from '../PostPreloader'
import { useNextPost, usePost, usePrevPost } from '../PostsApi'

import styles from './ViewPost.module.scss'

interface ViewPostProps {
  postId: Post['id']
}

export const ViewPost: FC<ViewPostProps> = ({
  postId,
}) => {
  const history = useHistory()
  const [ currentPostId, setCurrentPostId ] = useState<Post['id']>(postId)
  const { data: post, error, isLoading, isError } = usePost({ postId: currentPostId })

  const { data: nextPost } = useNextPost({ postId: currentPostId })
  const { data: prevPost } = usePrevPost({ postId: currentPostId })

  const onNextPost = () => nextPost && onChangePost(nextPost)
  const onPrevPost = () => prevPost && onChangePost(prevPost)

  useHotkey('ArrowLeft', onNextPost)
  useHotkey('ArrowRight', onPrevPost)

  const onChangePost = (post: Post) => {
    setCurrentPostId(post.id)
    history.replace(`/post/${post.slug}`)
  }

  const onPrimaryImageClick: MouseEventHandler<HTMLDivElement> = (event) => {
    const clickTarget = event.currentTarget
    const clickTargetWidth = clickTarget.offsetWidth
    const xCoordInClickTarget = event.clientX - clickTarget.getBoundingClientRect().left

    if (clickTargetWidth / 2 > xCoordInClickTarget) {
      onNextPost()
    } else {
      onPrevPost()
    }
  }

  if (isLoading) {
    return <Glass>Loading...</Glass>
  } else if (isError) {
    return <Glass>Error Loading Post :( {formatError(error)}</Glass>
  } else if (!post) {
    return <Glass>Unable to load post</Glass>
  }

  const primaryImage = post.images[0]

  const tags = post.tags
    .map(tag => tag.name)
    .sort((a, b) => a.localeCompare(b))

  const description = post.description || ''

  return (
    <>
      <Glass className={styles.imgWrapper} padding={0} onClick={onPrimaryImageClick}>
        <AsyncImg src={primaryImage.srcs.high} />
      </Glass>

      {(prevPost || nextPost) && (
        <Glass className={classnames(styles.section, styles.nav)}>
          <div>
            {nextPost && (
              <>
                <Button onClick={() => onChangePost(nextPost)} startIcon={<FontAwesomeIcon icon={faAnglesLeft} />}>
                  Next
                </Button>
                <PostPreloader postId={nextPost.id} />
              </>
            )}
          </div>

          <div>
            {prevPost && (
              <>
                <Button onClick={() => onChangePost(prevPost)} endIcon={<FontAwesomeIcon icon={faAnglesRight} />}>
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
          <div className={styles.title}>{post.title}</div>
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
