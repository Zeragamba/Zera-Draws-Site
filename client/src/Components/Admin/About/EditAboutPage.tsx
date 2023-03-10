import { Button, ButtonGroup, FormHelperText, Paper, Stack, Typography } from '@mui/material'
import TextField from '@mui/material/TextField'
import React, { FC, useEffect, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import ReactMarkdown from 'react-markdown'

import { ContentMeta } from '../../SiteMeta/SiteMetaData'
import { useMetaContent } from '../../SiteMeta/UseSiteMeta'
import { useUpdateMeta } from '../../SiteMeta/UseUpdateMeta'
import { muiField } from '../../UI/Form/RegisterMuiField'

import markdownIcon from '../../../Assets/markdown.svg'

export const EditAboutPage: FC = () => {
  const contentMeta = useMetaContent()
  const updateMeta = useUpdateMeta()
  const { handleSubmit, control, watch, formState } = useForm<ContentMeta>({ values: contentMeta })
  const [ mode, setMode ] = useState<'source' | 'split' | 'preview'>('split')

  useEffect(() => {
    if (formState.isDirty) updateMeta.reset()
  }, [ formState.isDirty ])

  const onFormSave: SubmitHandler<ContentMeta> = (data) => {
    updateMeta.mutate({ group: 'content', values: data })
  }

  return (
    <Stack gap={2}>
      <Stack component={Paper} sx={{ padding: 2 }} direction="row" alignItems="center">
        <Stack direction="row" justifyContent="flex-start" alignItems="center" sx={{ width: '33.333%' }}>
          <Typography variant="h2">About Page</Typography>
        </Stack>

        <Stack direction="row" justifyContent="center" alignItems="center" sx={{ width: '33.333%' }}>
          <ButtonGroup>
            <Button
              size="small"
              variant={mode === 'source' ? 'contained' : 'outlined'}
              onClick={() => setMode('source')}
            >Source</Button>
            <Button
              size="small"
              variant={mode === 'split' ? 'contained' : 'outlined'}
              onClick={() => setMode('split')}
            >Split</Button>
            <Button
              size="small"
              variant={mode === 'preview' ? 'contained' : 'outlined'}
              onClick={() => setMode('preview')}
            >Preview</Button>
          </ButtonGroup>
        </Stack>

        <Stack direction="row" justifyContent="flex-end" alignItems="center" sx={{ width: '33.333%' }}>
          {updateMeta.isIdle && (
            <Button size="small" variant="contained" onClick={handleSubmit(onFormSave)}>Save</Button>
          )}

          {updateMeta.isLoading && (
            <Button size="small" variant="contained" disabled>Saving</Button>
          )}

          {updateMeta.isSuccess && (
            <Button size="small" variant="outlined" onClick={handleSubmit(onFormSave)}>Saved</Button>
          )}
        </Stack>
      </Stack>

      <Stack gap={2} direction="row">
        {[ 'split', 'source' ].includes(mode) && (
          <Paper sx={{ flexGrow: 1, padding: 2 }}>
            <Controller
              control={control}
              name="about"
              render={(fieldProps) => (
                <TextField
                  {...muiField(fieldProps)}
                  multiline
                  minRows={5}
                  fullWidth
                  inputProps={{
                    sx: {
                      fontFamily: 'monospace',
                      lineHeight: '1em',
                    },
                  }}
                />
              )}
            />

            <FormHelperText>
              <img src={markdownIcon} style={{ height: 16, marginRight: 4, verticalAlign: 'middle' }} />
              <a href="https://commonmark.org/help/" target="_blank" rel="noreferrer">Markdown</a> format
              supported
            </FormHelperText>
          </Paper>
        )}

        {[ 'split', 'preview' ].includes(mode) && (
          <Paper sx={{ padding: 2, flexGrow: 1 }}>
            <ReactMarkdown>{watch('about') || ''}</ReactMarkdown>
          </Paper>
        )}
      </Stack>
    </Stack>
  )
}
