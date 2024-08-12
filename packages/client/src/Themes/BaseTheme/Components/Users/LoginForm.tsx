import { Button, Divider, Paper, Stack, TextField, Typography } from '@mui/material'
import React, { ChangeEvent, FC, FormEvent, useState } from 'react'

import { isServerApiError } from '../../../../Api'
import { usePasskeyLogin$, usePasswordLogin$ } from '../../../../Queries'
import { ErrorAlert } from '../Shared'

type LoginFormState = {
  username: string
  password: string
  error: null | string
}

export const LoginForm: FC = () => {
  const passkeyLogin$ = usePasskeyLogin$()
  const passwordLogin$ = usePasswordLogin$()
  const [ form, setForm ] = useState<LoginFormState>({ username: '', password: '', error: null })

  const handleChange = (field: keyof LoginFormState) => {
    return (event: ChangeEvent<HTMLInputElement>) => {
      setForm({ ...form, [field]: event.target.value })
    }
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    const { username, password } = form
    passwordLogin$.mutate({ username, password })
  }

  let error: string | null = null
  if (passwordLogin$.error) {
    if (isServerApiError(passwordLogin$.error)) {
      const serverError = passwordLogin$.error
      error = serverError.response.data.error
    }
    error = passwordLogin$.error.toString()
  }

  return (
    <form onSubmit={handleSubmit}>
      <Stack
        component={Paper}
        gap={2}
        sx={{
          maxWidth: 250,
          margin: 'auto',
          padding: 2,
        }}
      >
        <TextField
          size="small"
          label="Username"
          variant="filled"
          value={form.username}
          onChange={handleChange('username')}
          autoComplete="username"
          fullWidth
        />

        <TextField
          size="small"
          label="Password"
          variant="filled"
          type="password"
          value={form.password}
          onChange={handleChange('password')}
          autoComplete="current-password"
          fullWidth
        />

        {error && (
          <Typography>{error}</Typography>
        )}

        <Button variant="contained" type="submit" fullWidth>
          Login
        </Button>

        <Divider />

        <Button variant="contained" fullWidth onClick={() => passkeyLogin$.mutate({})}>
          Login with Passkey
        </Button>

        {passkeyLogin$.isError && <ErrorAlert error={passkeyLogin$.error} />}
      </Stack>
    </form>
  )
}
