import { Button, ButtonProps } from '@mui/material'
import React, { FC, useEffect } from 'react'

import { noOp } from '../../../../Lib/Noop'
import { Post } from '../../Post'

export interface PostNavBtnProps extends Omit<ButtonProps, 'onClick'> {
  post: Post
  onClick?: (post: Post) => void
  preloadSize?: string
  hotkey?: string
}

export const PostNavBtn: FC<PostNavBtnProps> = ({
  post,
  onClick = noOp,
  children,
  preloadSize,
  hotkey,
  ...btnProps
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
    <>
      <Button {...btnProps} onClick={() => onClick(post)} title={post.title}>{children}</Button>
      {imageSrc && <img style={{ display: 'none' }} src={imageSrc} />}
    </>
  )
}
