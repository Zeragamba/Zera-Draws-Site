import { zodResolver } from '@hookform/resolvers/zod'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import { FC } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { PasskeyData, PasskeyDataSchema } from '../../../../../Api/Schemas'
import { muiField } from '../../../../../Forms'
import { useRegisterPasskey$, useUpdatePasskey$ } from '../../../../../Queries'
import { ErrorAlert } from '../../Shared'

type EditPasskeyFormProps = {
  mode: 'edit'
  passkey: PasskeyData
  onSaved: (passkey: PasskeyData) => void
}

type CreatePasskeyFormProps = {
  mode: 'create'
  passkey?: never
  onSaved: (passkey: PasskeyData) => void
}

export type PasskeyFormProps =
  | EditPasskeyFormProps
  | CreatePasskeyFormProps

export const PasskeyForm: FC<PasskeyFormProps> = ({
  mode,
  passkey,
  onSaved,
}) => {
  const registerPasskey$ = useRegisterPasskey$()
  const updatePasskey$ = useUpdatePasskey$()

  const { control, handleSubmit, formState: { errors } } = useForm<PasskeyData>({
    resolver: zodResolver(PasskeyDataSchema.omit({ createdAt: true })),
    defaultValues: {
      id: '(NEW)',
      name: '',
      ...passkey,
    },
  })

  const onSubmit = handleSubmit(async (passkey) => {
    console.log({ mode })
    try {
      switch (mode) {
        case 'edit':
          console.log(`Updating passkey ${passkey.name}`)
          return onSaved(await updatePasskey$.mutateAsync(passkey))
        case 'create':
          console.log(`Creating passkey ${passkey.name}`)
          return onSaved(await registerPasskey$.mutateAsync(passkey))
      }
    } catch (e) {
      console.error(e)
    }
  })

  return (
    <form onSubmit={onSubmit}>
      <Stack gap={2} padding={2}>
        {errors.root && <ErrorAlert error={errors.root.message} />}
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

        {errors.name?.message && <span>{errors.name.message}</span>}

        {mode === 'edit' && (
          <>
            <Button variant="contained" type="submit" onClick={onSubmit}>Save Key</Button>
            {updatePasskey$.isError && <ErrorAlert error={updatePasskey$.error} />}
          </>
        )}

        {mode === 'create' && (
          <>
            <Button variant="contained" type="submit" onClick={onSubmit}>Create Key</Button>
            {registerPasskey$.isError && <ErrorAlert error={registerPasskey$.error} />}
          </>
        )}
      </Stack>
    </form>
  )
}
