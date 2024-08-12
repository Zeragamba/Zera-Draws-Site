import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { zodResolver } from '@hookform/resolvers/zod'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import { FC } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { PasskeyData, PasskeyDataSchema } from '../../../../../Api/Schemas'
import { muiField } from '../../../../../Forms'
import { FontAwesomeIcon } from '../../../../../Lib'
import { ErrorAlert } from '../../Shared'

type PasskeyFormProps = {
  loading?: boolean
  passkey: PasskeyData
  onSubmit: (passkey: PasskeyData) => (void | Promise<void>)
}

export const PasskeyForm: FC<PasskeyFormProps> = ({
  loading,
  passkey,
  onSubmit,
}) => {
  const { control, handleSubmit, formState: { errors } } = useForm<PasskeyData>({
    resolver: zodResolver(PasskeyDataSchema.omit({ createdAt: true })),
    defaultValues: { ...passkey },
  })

  const onFormSubmit = handleSubmit(onSubmit)

  return (
    <form onSubmit={onFormSubmit}>
      <Stack gap={2} paddingTop={2}>
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
              disabled={loading}
            />
          )}
        />

        {errors.name?.message && <span>{errors.name.message}</span>}

        <Button
          disabled={loading}
          startIcon={loading && <FontAwesomeIcon icon={faSpinner} spin />}
          variant="contained"
          type="submit"
        >
          Save Key
        </Button>
      </Stack>
    </form>
  )
}
