import { Button, TextField } from '@mui/material'
import classNames from 'classnames'
import { ChangeEvent, FC, FormEvent, useState } from 'react'

import { useLogin } from '../../../Lib/ServerApi/EndPoints/User/Login'
import { isServerApiError } from '../../../Lib/ServerApi/ServerClient'
import { Glass } from '../../../UI/Glass'

import styles from './LoginForm.module.scss'

type LoginFormState = {
  username: string
  password: string
  error: null | string
}

export const LoginForm: FC = () => {
  const loginQuery = useLogin()
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
      <Glass className={styles.LoginForm}>
        <TextField
          size="small"
          label="Username"
          variant="filled"
          value={form.username}
          onChange={handleChange('username')}
          className={styles.FormItem}
        />

        <TextField
          size="small"
          label="Password"
          variant="filled"
          type="password"
          value={form.password}
          onChange={handleChange('password')}
          className={styles.FormItem}
        />

        {error && (
          <div className={classNames(styles.FormItem, styles.ErrorMessage)}>
            {error}
          </div>
        )}

        <Button
          variant="contained"
          className={styles.FormItem}
          type="submit"
        >
          Login
        </Button>
      </Glass>
    </form>
  )
}
