import { FC } from 'react'
import { isError } from 'react-query'

import { usePost } from '../../Lib/ServerApi'
import { Glass } from '../UI/Glass'
import { EditPostForm } from './EditPostForm'

interface ViewPostProps {
  postId: string
}

export const EditPost: FC<ViewPostProps> = ({
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

  return (
    <EditPostForm post={post} />
  )

}

function formatError(error: unknown): string {
  if (isError(error)) return error.toString()
  return `${error}`
}
