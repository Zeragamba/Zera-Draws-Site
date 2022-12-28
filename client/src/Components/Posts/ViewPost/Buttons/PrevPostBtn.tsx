import { faAnglesLeft, faAnglesRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FC } from 'react'

import { Post } from '../../Post'
import { usePrevPost } from '../../PostsApi'
import { PostNavBtn, PostNavBtnProps } from './PostNavBtn'

interface PrevPostBtnProps extends Omit<PostNavBtnProps, 'post' | 'children'> {
  currentPostId: Post['id']
}

export const PrevPostBtn: FC<PrevPostBtnProps> = ({
  currentPostId,
  ...btnProps
}) => {
  const { data: PrevPost } = usePrevPost({ postId: currentPostId })
  if (!PrevPost) return null
  return (
    <PostNavBtn
      {...btnProps}
      post={PrevPost}
      endIcon={<FontAwesomeIcon icon={faAnglesRight} />}
    >Prev</PostNavBtn>
  )
}
