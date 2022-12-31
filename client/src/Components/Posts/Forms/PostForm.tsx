import TextField from '@mui/material/TextField'
import { FC, FormEventHandler, ReactNode, useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { formatSlug, parseFilename } from '../../../Lib/FilenameUtils'
import { EditableImage, Image } from '../../Images/Image'
import { useImageManager } from '../../Images/ImageManager/UseImageManager'
import { muiField } from '../../UI/Form/RegisterMuiField'
import { Glass } from '../../UI/Glass'
import { Post } from '../Post'
import { ImageChangePayload } from '../PostsApi/EditPost'
import { EditPostImages } from './EditPostImages'
import { PublishToggle } from './PublishToggle'

import styles from './PostForm.module.scss'

export type OnPostSubmitHandler = (payload: {
  post: Post
  images: Image[]
  imageChanges: ImageChangePayload[]
}) => void

interface PostFormProps {
  post: Post
  actions: (submitForm: FormEventHandler) => ReactNode
  onSubmit: OnPostSubmitHandler
}

export const PostForm: FC<PostFormProps> = ({
  post,
  actions,
  onSubmit,
}) => {
  const { handleSubmit, setValue, formState, control, watch, resetField } = useForm<Post>({ defaultValues: post })
  const imageManager = useImageManager({ images: post.images })

  useEffect(() => {
    const subscription = watch((post, { name }) => {
      switch (name) {
        case 'date':
        case 'title':
          if (formState.dirtyFields.slug) return
          setValue('slug', formatSlug(`${post.date}-${post.title}`))
      }
    })

    return () => subscription.unsubscribe()
  }, [ watch, setValue, formState ])

  const onImageAdd = (added: Required<EditableImage>) => {
    imageManager.addImage({ id: `add-${added.filename}`, ...added })
    if (imageManager.images.length === 0) {
      const { date, title } = parseFilename(added.filename)

      resetField('title', { defaultValue: title })
      resetField('date', { defaultValue: date })
      resetField('slug', { defaultValue: formatSlug(`${date}-${title}`) })
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
            render={(fieldProps) => (
              <TextField
                {...muiField(fieldProps)}
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
            rules={{ required: true }}
            render={(fieldProps) => (
              <TextField
                {...muiField(fieldProps)}
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
            render={(fieldProps) => (
              <TextField
                {...muiField(fieldProps)}
                label="Description"
                variant="filled"
                multiline
                minRows={5}
                fullWidth
              />
            )}
          />
        </Glass>
      </div>
      <div className={styles.RightColumn}>
        {actions && actions(handleSubmit(onFormSubmit))}
        <Controller
          control={control}
          name="released"
          render={({ field }) => (
            <PublishToggle
              released={field.value}
              onClick={() => field.onChange(!field.value)}
              variant={'outlined'}
              fullWidth
            />
          )}
        />
        <Glass display="flex" flexDirection="column" gap={2}>
          <Controller
            control={control}
            name={'slug'}
            render={(fieldProps) => (
              <TextField
                {...muiField(fieldProps)}
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
