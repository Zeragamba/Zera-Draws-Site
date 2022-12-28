import { faAnglesLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FC } from 'react'

import { Post } from '../../Post'
import { useNextPost } from '../../PostsApi'
import { PostNavBtn, PostNavBtnProps } from './PostNavBtn'

interface NextPostBtnProps extends Omit<PostNavBtnProps, 'post' | 'children'> {
  currentPostId: Post['id']
}

export const NextPostBtn: FC<NextPostBtnProps> = ({
  currentPostId,
  ...btnProps
}) => {
  const { data: nextPost } = useNextPost({ postId: currentPostId })
  if (!nextPost) return null
  return (
    <PostNavBtn
      {...btnProps}
      startIcon={<FontAwesomeIcon icon={faAnglesLeft} />}
      post={nextPost}
    >Next</PostNavBtn>
  )
}
