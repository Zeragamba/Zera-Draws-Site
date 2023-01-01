import { faAnglesLeft, faAnglesRight, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from '@mui/material'
import React, { FC, MouseEventHandler } from 'react'

import { colours } from '../../../Lib/Theme'
import { Post } from '../Post'
import { useNextPost, usePrevPost } from '../PostsApi'

import styles from './ViewPost.module.scss'

interface PostNavProps {
  postId: Post['id']
  onNextPost: (post: Post) => void
  onPrevPost: (post: Post) => void
}

export const PostNav: FC<PostNavProps> = ({
  postId,
  onNextPost,
  onPrevPost,
}) => {
  const { data: nextPost, isLoading: nextLoading } = useNextPost({ postId })
  const { data: prevPost, isLoading: prevLoading } = usePrevPost({ postId })

  const onPrevClick: MouseEventHandler = (event) => {
    if (!prevPost) return
    event.preventDefault()
    onPrevPost(prevPost)
  }

  const onNextClick: MouseEventHandler = (event) => {
    if (!nextPost) return
    event.preventDefault()
    onNextPost(nextPost)
  }

  return (
    <div className={styles.nav}>
      <div>
        <Button
          component="a"
          href={nextPost ? `/post/${nextPost.slug}` : '/'}
          onClick={onNextClick}
          variant="contained"
          sx={{ background: colours.grey, color: colours.light }}
          startIcon={<FontAwesomeIcon icon={nextLoading ? faSpinner : faAnglesLeft} spin={nextLoading} />}
          disabled={!nextPost}
        >
          Next
        </Button>
      </div>

      <div>
        <Button
          component="a"
          href={prevPost ? `/post/${prevPost.slug}` : '/'}
          onClick={onPrevClick}
          variant="contained"
          sx={{ background: colours.grey, color: colours.light }}
          endIcon={<FontAwesomeIcon icon={prevLoading ? faSpinner : faAnglesRight} spin={prevLoading} />}
          disabled={!prevPost}
        >
          Prev
        </Button>
      </div>
    </div>
  )
}
