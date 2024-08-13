import { Box, Button, Grid, InputAdornment, Paper, Stack, Typography } from '@mui/material'
import TextField from '@mui/material/TextField'
import { FC, useEffect } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

import { muiField } from '../../../../Forms'
import { SocialPlatform, SocialsMeta } from '../../../../Models'
import { useSocialPlatforms$, useUpdateSocialPlatforms$ } from '../../../../Queries'
import { SocialLogo } from '../../Components'

export const EditSocialsPage: FC = () => {
  const socials$ = useSocialPlatforms$()
  const updateSocials$ = useUpdateSocialPlatforms$()

  const { handleSubmit, control, formState } = useForm<SocialsMeta>({ values: socials$.data })

  useEffect(() => {
    if (formState.isDirty) updateSocials$.reset()
  }, [ formState.isDirty, updateSocials$ ])

  const onFormSave: SubmitHandler<SocialsMeta> = (data) => {
    updateSocials$.mutate(data)
  }

  return (
    <Paper sx={{ padding: 2 }}>
      <Stack gap={2}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h2">Social Links</Typography>
          </Box>

          <Stack direction="row" justifyContent="flex-end" alignItems="center" sx={{ flexGrow: 1 }}>
            {updateSocials$.isIdle && (
              <Button size="small" variant="contained" onClick={handleSubmit(onFormSave)}>Save</Button>
            )}

            {updateSocials$.isPending && (
              <Button size="small" variant="contained" disabled>Saving</Button>
            )}

            {updateSocials$.isSuccess && (
              <Button size="small" variant="outlined" onClick={handleSubmit(onFormSave)}>Saved</Button>
            )}
          </Stack>
        </Stack>

        <Grid container spacing={4}>
          {Object
            .values(SocialPlatform)
            .map(platform => (
              <Grid key={platform} item xs={12} sm={6} md={4} lg={3}>
                <Controller
                  control={control}
                  name={platform}
                  render={(fieldProps) => (
                    <TextField
                      {...muiField(fieldProps)}
                      label={platform}
                      size="small"
                      required
                      fullWidth
                      InputProps={{
                        startAdornment: <InputAdornment position="start">
                          <SocialLogo platform={platform} />
                        </InputAdornment>,
                      }}
                    />
                  )}
                />
              </Grid>
            ))
          }
        </Grid>
      </Stack>
    </Paper>
  )
}
