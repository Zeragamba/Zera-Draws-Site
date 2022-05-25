import { ChangeEvent, FC, FormEvent, useState } from 'react'

import { isServerApiError } from '../../../Lib/ServerApi'
import { login } from '../../../Store/Actions/UserActions'
import { useAppDispatch } from '../../../Store/AppState'

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

  const handleSubmit = (event: FormEvent) => {
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

  return <form onSubmit={handleSubmit}>
    {form.error && (
      <div>{form.error}</div>
    )}
    <div>
      <input
        type="text"
        name="username"
        value={form.username}
        placeholder={'Username'}
        onChange={handleChange('username')}
      />
      <input
        type="password"
        name="password"
        value={form.password}
        placeholder={'Password'}
        onChange={handleChange('password')}
      />
      <button type="submit">Login</button>
    </div>
  </form>
}
