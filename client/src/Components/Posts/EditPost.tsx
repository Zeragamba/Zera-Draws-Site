import { Button, Stack } from '@mui/material'
import { FC, useEffect, useState } from 'react'
import { isError } from 'react-query'
import { useNavigate } from 'react-router-dom'

import { EditableImage, Image, Post, usePost } from '../../Lib/ServerApi'
import { useEditPost } from '../../Lib/ServerApi/EndPoints/Posts/EditPost'
import { Glass } from '../UI/Glass'
import { addImage, editImage, removeImage, useImageChanges } from './ImagesChangeManager'
import { PostForm } from './PostForm'
import { PublishToggle } from './PublishToggle'

interface ViewPostProps {
  postId: string
}

export const EditPost: FC<ViewPostProps> = ({
  postId,
}) => {
  const navigate = useNavigate()
  const editPost$ = useEditPost()
  const [ imageChanges, applyChange ] = useImageChanges()
  const [ post, setPost ] = useState<Post | null>(null)

  const post$ = usePost({ postId, enabled: post === null })

  useEffect(() => {
    if (post) return
    setPost(post$.data || null)
  }, [ post$.data ])

  if (post$.isLoading) {
    return <Glass>Loading...</Glass>
  } else if (post$.isError) {
    return <Glass>Error Loading Post :( {formatError(post$.error)}</Glass>
  } else if (!post$.data || !post) {
    return <Glass>Unable to load post</Glass>
  }

  const onImageAdd = (added: Required<EditableImage>) => {
    const image = {
      id: `add-${added.filename}`,
      order: 0,
      height: 0,
      width: 0,
      mime_type: '',
      ext: '',
      filename: added.filename,
      srcs: {
        full: URL.createObjectURL(added.file),
      },
      file: added.file,
    }

    applyChange(addImage({ id: image.id, ...added }))

    setPost((post) => {
      if (post) {
        const images = [ ...post.images ]
        images.push({ ...image, order: images.length })
        post = { ...post, images }
      }

      return post
    })
  }

  const onImageEdit = (edited: Image, changes: Partial<EditableImage>) => {
    applyChange(editImage({ id: edited.id, ...changes }))

    setPost((post) => {
      if (post) {
        const images = post.images.map(image => {
          if (image.id !== edited.id) return image

          if (changes.filename) {
            image = {
              ...image,
              filename: changes.filename,
            }
          }

          if (changes.file) {
            image = {
              ...image,
              height: 0,
              width: 0,
              mime_type: '',
              ext: '',
              srcs: {
                full: URL.createObjectURL(changes.file),
              },
              file: changes.file,
            }
          }

          return image
        })

        post = { ...post, images }
      }

      return post
    })
  }

  const onImageRemove = (removed: Image) => {
    applyChange(removeImage({ id: removed.id }))

    setPost((post) => {
      if (post) {
        const images = post.images.filter(image => {
          if (image.id !== removed.id) return image
        })

        post = { ...post, images }
      }

      return post
    })
  }

  const onPostSave = async () => {
    const saved = await editPost$.mutateAsync({ postId, post, images: imageChanges })
    navigate(`/post/${saved.slug}`)
  }

  const onPublishToggle = async () => {
    if (!post) return
    setPost({ ...post, released: !post.released })

    const saved = await editPost$.mutateAsync({ postId, post: { released: !post.released } })
    setPost((post) => {
      if (post) {
        post = { ...post, released: saved.released }
      }

      return post
    })
  }

  const onEdit = (changes: Partial<Post>) => {
    if (!post) return
    setPost({ ...post, ...changes })
  }

  return (
    <PostForm
      post={post}
      onImageRemove={onImageRemove}
      onImageEdit={onImageEdit}
      onImageAdd={onImageAdd}
      onEdit={onEdit}
      actions={
        <Stack gap={1}>
          <Button
            variant={'contained'}
            disabled={editPost$.isLoading}
            onClick={onPostSave}
            fullWidth
          >Save</Button>
          <PublishToggle
            released={post.released}
            onClick={onPublishToggle}
            disabled={editPost$.isLoading}
            variant={'outlined'}
            fullWidth
          />
        </Stack>
      }
    />
  )

}

function formatError(error: unknown): string {
  if (isError(error)) return error.toString()
  return `${error}`
}
