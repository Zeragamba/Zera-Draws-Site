import { Link } from '@mui/material'
import { FC, ReactNode, useEffect } from 'react'

import { Post } from '../../Lib/ServerApi'
import { noOp } from '../../Lib/util'

export interface PostNavBtnProps {
  post: Post
  onClick?: (post: Post) => void
  children: ReactNode
  preloadSize?: string
  hotkey?: string
}

export const PostNavBtn: FC<PostNavBtnProps> = ({
  post,
  onClick = noOp,
  children,
  preloadSize,
  hotkey,
}) => {
  let imageSrc: string | undefined
  if (preloadSize) {
    const image = post.images[0]
    imageSrc = image.srcs[preloadSize]
  }

  useEffect(() => {
    if (!hotkey) return

    const onKeydown = (event: KeyboardEvent) => {
      if (event.code === hotkey) {
        onClick(post)
      }
    }

    document.addEventListener('keydown', onKeydown)

    return () => {
      document.removeEventListener('keydown', onKeydown)
    }
  }, [ hotkey, onClick, post ])

  return (
    <div>
      <Link title={post.title} onClick={() => onClick(post)}>{children}</Link>
      {imageSrc && <img style={{ display: 'none' }} src={imageSrc} />}
    </div>
  )
}
