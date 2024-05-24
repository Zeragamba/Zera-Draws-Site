import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import { FC } from 'react'
import { Controller, SubmitHandler } from 'react-hook-form'

import { PasskeyData } from '../../../../../Api/Schemas'
import { usePasskeyForm } from '../../../../../Controllers/Auth/UsePasskeyForm'
import { muiField } from '../../../../../Forms'
import { useRegisterPasskey$ } from '../../../../../Queries'
import { ErrorAlert } from '../../Shared'

interface PasskeyFormProps {
  mode: 'edit' | 'create'
  onSaved: (passkey: PasskeyData) => void
}

export const PasskeyForm: FC<PasskeyFormProps> = ({
  mode,
  onSaved,
}) => {
  const registerPasskey$ = useRegisterPasskey$()

  const { control, handleSubmit, formState: { errors } } = usePasskeyForm()
  const onSubmit: SubmitHandler<PasskeyData> = async (passkey) => {
    try {
      switch (mode) {
        case 'create':
          return onSaved(await registerPasskey$.mutateAsync(passkey))
      }
    } catch (e) {
      console.error(e)
    }
  }

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack gap={2} padding={2}>
        <Controller
          control={control}
          name={'name'}
          rules={{
            required: true,
          }}
          render={(props) => (
            <TextField
              {...muiField(props)}
              label="Passkey Name"
              name="passkey-name"
              autoComplete="off"
            />
          )}
        />

        {errors.name?.message && <span>{errors.name?.message}</span>}

        {mode === 'edit' && <Button variant="contained" type="submit">Save Key</Button>}
        {mode === 'create' && <Button variant="contained" type="submit">Create Key</Button>}

        {registerPasskey$.isError && <ErrorAlert error={registerPasskey$.error} />}
      </Stack>
    </form>
  )
}
