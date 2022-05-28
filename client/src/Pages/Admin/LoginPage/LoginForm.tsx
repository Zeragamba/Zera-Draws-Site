import { Button, TextField } from '@mui/material'
import classNames from 'classnames'
import { ChangeEvent, FC, FormEvent, useState } from 'react'

import { isServerApiError } from '../../../Lib/ServerApi'
import { login } from '../../../Store/Actions/UserActions'
import { useAppDispatch } from '../../../Store/AppState'
import { Glass } from '../../../UI/Glass'

import styles from './LoginForm.module.scss'

type LoginFormState = {
  username: string
  password: string
  error: null | string
}

export const LoginForm: FC = () => {
  const dispatch = useAppDispatch()
  const [ form, setForm ] = useState<LoginFormState>({ username: '', password: '', error: null })

  const handleChange = (field: keyof LoginFormState) => {
    return (event: ChangeEvent<HTMLInputElement>) => {
      setForm({ ...form, [field]: event.target.value })
    }
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()

    dispatch(login(form.username, form.password))
      .catch(error => {
        if (isServerApiError(error)) {
          error = error.response.data.error
        } else {
          error = error.toString()
        }

        setForm({ ...form, error })
      })
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

        {form.error && (
          <div className={classNames(styles.FormItem, styles.ErrorMessage)}>
            {form.error}
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
