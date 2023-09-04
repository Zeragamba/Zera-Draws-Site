import { Box, FormHelperText, Grid, Paper, Stack, Typography } from '@mui/material'
import TextField from '@mui/material/TextField'
import { DatePicker } from '@mui/x-date-pickers'
import * as dateFns from 'date-fns'
import { FC, ReactNode, useEffect } from 'react'
import { Controller, UseFormReturn } from 'react-hook-form'

import { EditPostImages } from './EditPostImages'
import { PublishSettings } from './PublishSettings'
import { formatTitle, parseFilename } from '../../../Lib/FilenameUtils'
import { EditableImage, ImageData } from '../../Images/ImageData'
import { ImageManager } from '../../Images/ImageManager'
import { PostTagsField } from '../../Tags/PostTagsField'
import { SelectedTagList } from '../../Tags/SelectedTagList'
import { TagData } from '../../Tags/TagData'
import { muiField } from '../../UI/Form/RegisterMuiField'
import { PostData } from '../PostData'
import { formatPostSlug } from '../PostUtil'

import styles from './PostForm.module.scss'

import markdownIcon from '../../../Assets/markdown.svg'

interface PostFormProps {
  form: UseFormReturn<PostData>
  imageManager: ImageManager
  mode?: 'edit' | 'create'
  slots: {
    actions: ReactNode
    rightCol?: ReactNode
  }
}

export const PostForm: FC<PostFormProps> = ({
  form,
  mode = 'edit',
  imageManager,
  slots,
}) => {
  const { watch, setValue, formState } = form

  useEffect(() => {
    const subscription = watch((post, { name }) => {
      switch (name) {
        case 'title':
        case 'date':
          if (formState.dirtyFields.slug) return
          if (mode !== 'create') return
          setValue('slug', formatPostSlug(post))
          break
      }
    })

    return () => subscription.unsubscribe()
  }, [ watch, setValue, formState, mode ])

  const onImageAdd = (added: Required<EditableImage>) => {
    imageManager.addImage({ id: `add-${crypto.randomUUID()}`, ...added })

    if (imageManager.images.length === 0) {
      const { date, title } = parseFilename(added.filename)
      form.resetField('title', { defaultValue: formatTitle(title) })
      form.resetField('date', { defaultValue: date })
      form.resetField('slug', { defaultValue: formatPostSlug({ date, title }) })
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

  return (
    <Box className={styles.PostForm}>
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
                rules={{
                  required: 'Title is required',
                }}
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
                rules={{
                  required: 'Date is required',
                }}
                render={(fieldProps) => (
                  <DatePicker
                    label="Date"
                    showDaysOutsideCurrentMonth
                    value={dateFns.parseISO(fieldProps.field.value || '')}
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
                rules={{
                  required: 'Slug is required',
                }}
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
                <img src={markdownIcon} style={{ height: 16, marginRight: 4, verticalAlign: 'middle' }} alt={'Markdown Icon'}/>
                <a href="https://commonmark.org/help/" target="_blank" rel="noreferrer">Markdown</a> format supported
              </FormHelperText>
            </Grid>
          </Grid>
        </Paper>
      </div>

      <Box className={styles.RightColumn}>
        <Stack gap={2} sx={{ position: 'sticky', top: 0 }}>
          <Stack component={Paper} gap={2} sx={{ padding: 2 }}>
            {slots.actions}

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

          {slots.rightCol}
        </Stack>
      </Box>
    </Box>
  )
}
