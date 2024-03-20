import { Button, Paper, Stack, TextField, Typography } from '@mui/material'
import React, { ChangeEvent, FC, FormEvent, useState } from 'react'

import { isServerApiError } from '../../../../Api'
import { useLogin$ } from '../../../../Queries'

type LoginFormState = {
  username: string
  password: string
  error: null | string
}

export const LoginForm: FC = () => {
  const loginQuery = useLogin$()
  const [ form, setForm ] = useState<LoginFormState>({ username: '', password: '', error: null })

  const handleChange = (field: keyof LoginFormState) => {
    return (event: ChangeEvent<HTMLInputElement>) => {
      setForm({ ...form, [field]: event.target.value })
    }
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    const { username, password } = form
    loginQuery.mutate({ username, password })
  }

  let error: string | null = null
  if (loginQuery.error) {
    if (isServerApiError(loginQuery.error)) {
      const serverError = loginQuery.error
      error = serverError.response.data.error
    }
    error = loginQuery.error.toString()
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
          fullWidth
        />

        <TextField
          size="small"
          label="Password"
          variant="filled"
          type="password"
          value={form.password}
          onChange={handleChange('password')}
          fullWidth
        />

        {error && (
          <Typography>{error}</Typography>
        )}

        <Button variant="contained" type="submit" fullWidth>
          Login
        </Button>
      </Stack>
    </form>
  )
}
