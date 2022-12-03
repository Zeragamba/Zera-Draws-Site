import TextField from '@mui/material/TextField'
import { FC, FormEventHandler, ReactNode } from 'react'
import { Controller, useForm, UseFormSetValue } from 'react-hook-form'

import { EditableImage, Image, Post } from '../../../Lib/ServerApi'
import { ImageChangePayload } from '../../../Lib/ServerApi/EndPoints/Posts/EditPost'
import { useImageManager } from '../../Images/ImageManager/UseImageManager'
import { muiField } from '../../UI/Form/RegisterMuiField'
import { Glass } from '../../UI/Glass'
import { EditPostImages } from './EditPostImages'

import styles from './PostForm.module.scss'

export type OnPostSubmitHandler = (payload: {
  post: Post
  images: Image[]
  imageChanges: ImageChangePayload[]
}) => void

interface PostFormProps {
  post: Post
  actions: (submitForm: FormEventHandler, setValue: UseFormSetValue<Post>) => ReactNode
  onSubmit: OnPostSubmitHandler
}

export const PostForm: FC<PostFormProps> = ({
  post,
  actions,
  onSubmit,
}) => {
  const { handleSubmit, setValue, control } = useForm<Post>({ defaultValues: post })
  const imageManager = useImageManager({ images: post.images })

  const onImageAdd = (added: Required<EditableImage>) => {
    imageManager.addImage({ id: `add-${added.filename}`, ...added })
    if (imageManager.images.length === 0) {
      const title = added.filename.replace(/\.[^/.]+$/, '')

      setValue('title', title)
      setValue('slug', title.toLowerCase().replace(/\W+/g, '-'))
    }
  }

  const onImageEdit = (edited: Image, changes: Partial<EditableImage>) => {
    imageManager.editImage({ id: edited.id, ...changes })
  }

  const onImageRemove = (removed: Image) => {
    imageManager.removeImage({ id: removed.id })
  }

  const onFormSubmit = (post: Post) => {
    onSubmit({
      post: post,
      images: imageManager.images,
      imageChanges: imageManager.changes,
    })
  }

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className={styles.PostForm}>
      <div className={styles.LeftColumn}>
        <EditPostImages images={imageManager.images} onRemove={onImageRemove} onEdit={onImageEdit} onAdd={onImageAdd} />
        <Glass display="flex" flexDirection="column" gap={1}>
          <Controller
            control={control}
            name={'title'}
            render={({ field }) => (
              <TextField
                {...muiField(field)}
                label="Title"
                variant="filled"
                required
                fullWidth
              />
            )}
          />
          <Controller
            control={control}
            name={'date'}
            render={({ field }) => (
              <TextField
                {...muiField(field)}
                label="Date"
                variant="filled"
                required
                fullWidth
              />
            )}
          />
          <Controller
            control={control}
            name={'description'}
            render={({ field }) => (
              <TextField
                {...muiField(field)}
                label="Description"
                variant="filled"
                required
                multiline
                minRows={5}
                fullWidth
              />
            )}
          />
        </Glass>
      </div>
      <div className={styles.RightColumn}>
        {actions && actions(handleSubmit(onFormSubmit), setValue)}
        <Glass display="flex" flexDirection="column" gap={2}>
          <Controller
            control={control}
            name={'slug'}
            render={({ field }) => (
              <TextField
                {...muiField(field)}
                label="URL Slug"
                variant="filled"
                required
                fullWidth
              />
            )}
          />
          <div>
            <div>Tags</div>
            <div>Select list</div>
          </div>
          <div>
            <div>Galleries</div>
            <div>Select list</div>
          </div>
        </Glass>
      </div>
    </form>
  )
}
