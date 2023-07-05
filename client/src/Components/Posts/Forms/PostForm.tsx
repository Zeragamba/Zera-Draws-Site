import { Box, FormHelperText, Grid, Paper, Stack, Typography } from '@mui/material'
import TextField from '@mui/material/TextField'
import { DatePicker } from '@mui/x-date-pickers'
import { parseISO } from 'date-fns'
import React, { FC, FormEventHandler, ReactNode, useEffect } from 'react'
import { Controller, FormProvider, useForm } from 'react-hook-form'

import { DeletePostButton } from './DeletePostButton'
import { EditPostImages } from './EditPostImages'
import { PublishSettings } from './PublishSettings'
import { formatSlug, formatTitle, parseFilename } from '../../../Lib/FilenameUtils'
import { EditableImage, ImageData } from '../../Images/ImageData'
import { useImageManager } from '../../Images/ImageManager/UseImageManager'
import { PostTagsField } from '../../Tags/PostTagsField'
import { SelectedTagList } from '../../Tags/SelectedTagList'
import { TagData } from '../../Tags/TagData'
import { muiField } from '../../UI/Form/RegisterMuiField'
import { PostData } from '../PostData'
import { ImageChangePayload } from '../PostsApi/EditPost'

import styles from './PostForm.module.scss'

import markdownIcon from '../../../Assets/markdown.svg'

export type OnPostSubmitHandler = (payload: {
  post: PostData
  images: ImageData[]
  imageChanges: ImageChangePayload[]
}) => void

interface PostFormProps {
  mode: 'create' | 'edit'
  post: PostData
  actions: (submitForm: FormEventHandler) => ReactNode
  onSubmit: OnPostSubmitHandler
  onDeleted?: (post: PostData) => void
}

export const PostForm: FC<PostFormProps> = ({
  mode,
  post,
  actions,
  onSubmit,
  onDeleted,
}) => {
  const form = useForm<PostData>({ defaultValues: post })
  const imageManager = useImageManager({ images: post.images })

  useEffect(() => {
    const subscription = form.watch((post, { name }) => {
      switch (name) {
        case 'title':
          if (form.formState.dirtyFields.slug) return
          if (mode !== 'create') return
          form.setValue('slug', formatSlug(post.title || ''))
          break
      }
    })

    return () => subscription.unsubscribe()
  }, [ form.watch, form.setValue, form.formState ])

  const onImageAdd = (added: Required<EditableImage>) => {
    imageManager.addImage({ id: `add-${crypto.randomUUID()}`, ...added })

    if (imageManager.images.length === 0) {
      const { date, title } = parseFilename(added.filename)

      form.resetField('title', { defaultValue: formatTitle(title) })
      form.resetField('date', { defaultValue: date })

      if (mode !== 'create') {
        form.resetField('slug', { defaultValue: formatSlug(title) })
      }
    }
  }

  const onImageEdit = (edited: ImageData, changes: Partial<EditableImage>) => {
    imageManager.editImage({ id: edited.id, ...changes })
  }

  const onImageRemove = (removed: ImageData) => {
    imageManager.removeImage({ id: removed.id })
  }

  const onTagRemoved = (removed: TagData) => {
    const tags = form.getValues('tags')
    form.setValue('tags', tags.filter(tag => tag.id !== removed.id))
  }

  const onFormSubmit = (post: PostData) => {
    onSubmit({
      post: post,
      images: imageManager.images,
      imageChanges: imageManager.changes,
    })
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onFormSubmit)} className={styles.PostForm}>
        <Box className={styles.images}>
          <EditPostImages
            images={imageManager.images}
            onRemove={onImageRemove}
            onEdit={onImageEdit}
            onAdd={onImageAdd}
          />
        </Box>

        <div className={styles.LeftColumn}>
          <Paper>
            <Grid container spacing={4} padding={2}>
              <Grid item sm={12}>
                <Controller
                  control={form.control}
                  name={'title'}
                  render={(fieldProps) => (
                    <TextField
                      {...muiField(fieldProps)}
                      label="Title"
                      required
                      fullWidth
                    />
                  )}
                />
              </Grid>

              <Grid item sm={4}>
                <Controller
                  control={form.control}
                  name={'date'}
                  rules={{ required: true }}
                  render={(fieldProps) => (
                    <DatePicker
                      label="Date"
                      showDaysOutsideCurrentMonth
                      value={parseISO(fieldProps.field.value || '')}
                      onChange={(date) => fieldProps.field.onChange(date?.toISOString() || '')}
                      slotProps={{
                        textField: { size: 'small' },
                      }}
                    />
                  )}
                />
              </Grid>

              <Grid item sm={8}>
                <Controller
                  control={form.control}
                  name={'slug'}
                  render={(fieldProps) => (
                    <TextField
                      {...muiField(fieldProps)}
                      label="URL Slug"
                      size="small"
                      required
                      fullWidth
                      helperText={mode === 'edit' ? 'Warning: Changing the slug will break links and bookmarks' : undefined}
                    />
                  )}
                />
              </Grid>

              <Grid item sm={12}>
                <Controller
                  control={form.control}
                  name={'description'}
                  render={(fieldProps) => (
                    <TextField
                      {...muiField(fieldProps)}
                      label="Description"
                      multiline
                      minRows={5}
                      fullWidth
                    />
                  )}
                />
                <FormHelperText>
                  <img src={markdownIcon} style={{ height: 16, marginRight: 4, verticalAlign: 'middle' }} />
                  <a href="https://commonmark.org/help/" target="_blank" rel="noreferrer">Markdown</a> format supported
                </FormHelperText>
              </Grid>
            </Grid>
          </Paper>
        </div>

        <Box className={styles.RightColumn}>
          <Stack gap={2} sx={{ position: 'sticky', top: 0 }}>
            <Stack component={Paper} gap={2} sx={{ padding: 2 }}>
              {actions && actions(form.handleSubmit(onFormSubmit))}

              <PublishSettings formControl={form.control} />
            </Stack>

            <Stack component={Paper} gap={2} sx={{ padding: 2 }}>
              <Typography sx={{ padding: 1 }}>Tags</Typography>
              <Controller
                control={form.control}
                name={'tags'}
                render={({ field }) => (
                  <>
                    <PostTagsField selected={field.value} onChange={field.onChange} />
                    <SelectedTagList tags={field.value} onDelete={onTagRemoved} />
                  </>
                )}
              />
            </Stack>

            {mode === 'edit' && <DeletePostButton post={post} fullWidth onDeleted={onDeleted} />}
          </Stack>
        </Box>
      </form>
    </FormProvider>
  )
}
