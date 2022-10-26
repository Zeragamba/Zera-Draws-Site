import { faCheck, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from '@mui/material'
import { FC } from 'react'

import { Post } from '../../Lib/ServerApi'
import { useEditPost } from '../../Lib/ServerApi/EndPoints/Posts/EditPost'

import styles from './PostForm.module.scss'


interface PublishToggleProps {
  postId: Post['id']
  released: boolean
}

export const PublishToggle: FC<PublishToggleProps> = ({
  postId,
  released,
}) => {
  const editPost = useEditPost()

  const className = styles.PublishBtn

  const onClick = () => {
    if (editPost.isLoading) return

    editPost.mutate({
      postId,
      post: { released: !released },
    })
  }

  if (released) {
    return (
      <Button className={className} variant={'contained'} onClick={onClick} disabled={editPost.isLoading}>
        <FontAwesomeIcon icon={faCheck} /> Public
      </Button>
    )
  } else {
    return (
      <Button className={className} variant={'outlined'} onClick={onClick} disabled={editPost.isLoading}>
        <FontAwesomeIcon icon={faEyeSlash} /> Private
      </Button>
    )
  }


}
