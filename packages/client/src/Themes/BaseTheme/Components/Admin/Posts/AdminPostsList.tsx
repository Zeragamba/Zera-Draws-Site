import { faEdit, faSort, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { Box, Button, Dialog, DialogContent, Paper, Stack, SxProps, Typography } from '@mui/material'
import { FC, MouseEventHandler, useState } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { useHref, useNavigate } from 'react-router-dom'

import { useSortable } from '../../../../../Hooks'
import { PostData } from '../../../../../Models'
import { useUpdatePost$ } from '../../../../../Queries'
import { FontAwesomeIcon } from '../../Icons'
import { AsyncImg } from '../../Images'
import { EditPostForm, PostTags, Styles } from '../../Posts'

interface AdminPostsListProps {
  posts: PostData[]
}

export const AdminPostsList: FC<AdminPostsListProps> = ({
  posts,
}) => {
  const editPost$ = useUpdatePost$()
  const [ orderedPosts, reorderPost ] = useSortable(posts)

  const onOrderDrop = (postId: PostData['id'], newPosition: number) => {
    editPost$.mutate({
      postId: postId,
      post: { position: newPosition },
    })
  }

  return (
    <Stack gap={2}>
      {[ ...orderedPosts ].reverse().map(post => (
        <AdminPostListItem
          key={post.id}
          post={post}
          reorderDisabled={editPost$.isPending}
          onOrderHover={reorderPost}
          onOrderDrop={onOrderDrop}
        />
      ))}
    </Stack>
  )
}

interface PostListItemProps {
  post: PostData
  reorderDisabled: boolean
  onOrderHover: (postId: PostData['id'], position: number) => void
  onOrderDrop: (postId: PostData['id'], position: number) => void
}

const AdminPostListItem: FC<PostListItemProps> = ({
  post,
  reorderDisabled,
  onOrderHover,
  onOrderDrop,
}) => {
  const navigate = useNavigate()
  const href = useHref(`/post/${post.slug}`)
  const image = post.images[0]
  const imgSize = 80
  const [ isEditing, setIsEditing ] = useState<boolean>(false)

  const imgStyles: SxProps = Styles.postListItem.img

  const onViewClick: MouseEventHandler = (event) => {
    event.preventDefault()
    navigate(href)
  }

  const [ _dragProps, dragHandleRef, dragPreviewRef ] = useDrag<{ id: string }>({
    type: 'post',
    item: { id: post.id },
  })

  const [ _dropProps, dropRef ] = useDrop<{ id: string }>({
    accept: 'post',
    hover: (item) => {
      if (item.id === post.id) return
      onOrderHover(item.id, post.position)
    },
    drop: item => {
      onOrderDrop(item.id, post.position)
    },
  })

  return (
    <Paper
      sx={{ textDecoration: 'none' }}
      ref={node => {
        dragPreviewRef(node)
        dropRef(node)
      }}
    >
      <Stack direction="row" gap={2} alignItems={'center'}>
        <Box sx={{ paddingLeft: 2 }}>
          {reorderDisabled ? (
            <FontAwesomeIcon icon={faSpinner} fixedWidth spin />
          ) : (
            <Box ref={dragHandleRef} sx={{ cursor: 'ns-resize' }}>
              <FontAwesomeIcon icon={faSort} fixedWidth />
            </Box>
          )}
        </Box>

        <Box
          component="a"
          sx={{ height: imgSize, width: imgSize, flexShrink: 0, '& img': imgStyles }}
          href={href}
          onClick={onViewClick}
        >
          <AsyncImg
            src={image.srcs.gallery || image.srcs.full}
            alt={post.title}
          />
        </Box>

        <Stack gap={1} sx={{ flexGrow: 1, padding: 2 }}>
          <Typography
            component="a"
            variant="body1"
            sx={{
              fontWeight: 'bold',
              flexGrow: 1,
              color: 'black',
              textDecoration: 'none',
              '&:hover': {
                color: 'primary.dark',
              },
            }}
            href={href}
            onClick={onViewClick}
          >
            {post.title}
          </Typography>

          <Stack direction="row" gap={2} alignItems="center">
            <Button
              component="a"
              href={`/post/${post.id}/edit`}
              onClick={(event) => {
                event.preventDefault()
                setIsEditing(true)
              }}
              startIcon={<FontAwesomeIcon icon={faEdit} fixedWidth />}
              size="small"
            >
              Edit
            </Button>

            <PostTags post={post} />
          </Stack>
        </Stack>
      </Stack>

      <Dialog open={isEditing} fullWidth maxWidth="xl" sx={{ alignItems: 'flex-start' }}>
        <DialogContent>
          <EditPostForm
            post={post}
            onSaved={() => setIsEditing(false)}
            onCancel={() => setIsEditing(false)}
            onDelete={() => setIsEditing(false)}
          />
        </DialogContent>
      </Dialog>
    </Paper>
  )
}
