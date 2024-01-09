import { Box, Paper, Stack, SxProps, Typography } from '@mui/material'
import React, { FC, MouseEventHandler } from 'react'
import { useHref, useNavigate } from 'react-router-dom'

import { PostTags } from './PostTags'
import { AsyncImg, PostData } from '../../../Lib'

interface PostsListProps {
  posts: PostData[]
}

export const PostsList: FC<PostsListProps> = ({
  posts,
}) => {
  return (
    <Stack gap={2}>
      {posts.map(post => <PostListItem key={post.id} post={post} />)}
    </Stack>
  )
}

export const Styles = {
  postListItem: {
    img: {
      width: '100%',
      height: '100%',

      objectFit: 'cover',
      objectPosition: 'top',
      background: 'gray',
    },
  },
}

interface PostListItemProps {
  post: PostData
}

const PostListItem: FC<PostListItemProps> = ({
  post,
}) => {
  const navigate = useNavigate()
  const href = useHref(`/post/${post.slug}`)
  const image = post.images[0]
  const imgSize = 80

  const imgStyles: SxProps = Styles.postListItem.img

  const onClick: MouseEventHandler = (event) => {
    event.preventDefault()
    navigate(href)
  }

  return (
    <Paper component="a" href={href} onClick={onClick} sx={{ textDecoration: 'none' }}>
      <Stack direction="row" gap={2} alignItems={'center'}>
        <Box sx={{ height: imgSize, width: imgSize, flexShrink: 0, '& img': imgStyles }}>
          <AsyncImg
            src={image.srcs.gallery || image.srcs.full}
            alt={post.title}
          />
        </Box>

        <Stack gap={1} sx={{ flexGrow: 1, padding: 2 }}>
          <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{post.title}</Typography>
          <PostTags post={post} />
        </Stack>
      </Stack>
    </Paper>
  )
}
