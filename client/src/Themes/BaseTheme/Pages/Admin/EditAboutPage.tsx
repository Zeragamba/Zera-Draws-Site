import { faMarkdown } from '@fortawesome/free-brands-svg-icons'
import {
  Button,
  ButtonGroup,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  Paper,
  Stack,
  Switch,
  Typography,
} from '@mui/material'
import TextField from '@mui/material/TextField'
import React, { FC, useEffect, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import ReactMarkdown from 'react-markdown'

import { muiField } from '../../../../Forms'
import { FontAwesomeIcon } from '../../../../Lib'
import { ContentMeta, FeatureFlag } from '../../../../Models'
import {
  useCustomContent$,
  useFeatureFlags$,
  useUpdateCustomContent$,
  useUpdateFeatureFlags$,
} from '../../../../Queries'

export const EditAboutPage: FC = () => {
  const featureFlags$ = useFeatureFlags$()
  const featureFlags = featureFlags$.data || {}

  const customContent$ = useCustomContent$()
  const customContent = customContent$.data

  const aboutPageEnabled = featureFlags[FeatureFlag.AboutPage] || false

  const updateFlags$ = useUpdateFeatureFlags$()
  const updateCustomContent$ = useUpdateCustomContent$()

  const { handleSubmit, control, watch, formState } = useForm<ContentMeta>({ values: customContent })
  const [ mode, setMode ] = useState<'source' | 'split' | 'preview'>('split')

  useEffect(() => {
    if (formState.isDirty) updateCustomContent$.reset()
  }, [ formState.isDirty, updateCustomContent$ ])

  const onFormSave: SubmitHandler<ContentMeta> = (data) => {
    updateCustomContent$.mutate(data)
  }

  const onEnabledToggle = () => {
    updateFlags$.mutate({
      ...featureFlags,
      [FeatureFlag.AboutPage]: !aboutPageEnabled,
    })
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
          <FormGroup>
            <FormControlLabel
              control={<Switch checked={aboutPageEnabled} onChange={onEnabledToggle} />}
              label="Enabled"
            />
          </FormGroup>

          {updateCustomContent$.isIdle && (
            <Button size="small" variant="contained" onClick={handleSubmit(onFormSave)}>Save</Button>
          )}

          {updateCustomContent$.isPending && (
            <Button size="small" variant="contained" disabled>Saving</Button>
          )}

          {updateCustomContent$.isSuccess && (
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
              <Stack direction="row" gap={1} alignItems="center">
                <FontAwesomeIcon icon={faMarkdown} />
                <a href="https://commonmark.org/help/" target="_blank" rel="noreferrer">Markdown</a> format supported
              </Stack>
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
