import { FC, useState } from 'react'
import { isError } from 'react-query'

import { Post, usePost } from '../../Lib/ServerApi'
import { useHistory } from '../../Pages/AppRouter'
import { AsyncImg } from '../UI/AsyncImg'
import { Glass } from '../UI/Glass'
import { NextPostBtn } from './NextPostBtn'
import { PrevPostBtn } from './PrevPostBtn'

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

  const onChangePost = (post: Post) => {
    setCurrentPostId(post.id)
    history.replace(`/post/${post.slug}`)
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
      <Glass className={styles.imgWrapper} padding={0}>
        <AsyncImg src={primaryImage.srcs.high} />
      </Glass>

      <Glass className={styles.section}>
        <div>
          <div className={styles.title}>{post.title}</div>
          <div className={styles.date}>{post.date}</div>
        </div>

        <div className={styles.nav}>
          <div>
            <NextPostBtn
              onClick={onChangePost}
              currentPostId={currentPostId}
              preloadSize={'high'}
              hotkey={'ArrowLeft'}
            />
          </div>
          <div>
            <PrevPostBtn
              onClick={onChangePost}
              currentPostId={currentPostId}
              preloadSize={'high'}
              hotkey={'ArrowRight'}
            />
          </div>
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
