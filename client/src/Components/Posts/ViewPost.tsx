import { FC } from 'react'
import { isError } from 'react-query'

import { usePost } from '../../Lib/ServerApi'
import { Glass } from '../UI/Glass'

import styles from './ViewPost.module.scss'

interface ViewPostProps {
  postId: string
}

export const ViewPost: FC<ViewPostProps> = ({
  postId,
}) => {
  const { data: post, error, isLoading, isError } = usePost({ postId })

  if (isLoading) {
    return <Glass>Loading...</Glass>
  } else if (isError) {
    return <Glass>Error Loading Post :( {formatError(error)}</Glass>
  } else if (!post) {
    return <Glass>Unable to load post</Glass>
  }

  const tags = post.tags
    .map(tag => tag.name)
    .sort((a, b) => a.localeCompare(b))

  return (
    <>
      <Glass className={styles.imgWrapper}>
        <img className={styles.img} src={post.images[0].srcs.high} />
      </Glass>
      <Glass className={styles.descWrapper}>
        <div className={styles.title}>{post.title}</div>
        <div className={styles.date}>{post.date}</div>
        <div className={styles.tags}>{tags.join(', ')}</div>
      </Glass>
    </>
  )

}

function formatError(error: unknown): string {
  if (isError(error)) return error.toString()
  return `${error}`
}
