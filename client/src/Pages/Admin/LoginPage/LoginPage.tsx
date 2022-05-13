import { ChangeEvent, FC, FormEvent, useState } from 'react'

import { isServerApiError } from '../../../Lib/ServerApi'
import { useCurrentUser, useLogin, useLogout } from '../../../User/UserContext'

type LoginFormState = {
  username: string
  password: string
  error: null | string
}

export const LoginPage: FC = () => {
  const login = useLogin()
  const logout = useLogout()
  const [currentUser, fetchingUser] = useCurrentUser()
  const [form, setForm] = useState<LoginFormState>({ username: '', password: '', error: null })

  const handleChange = (field: keyof LoginFormState) => {
    return (event: ChangeEvent<HTMLInputElement>) => {
      setForm({ ...form, [field]: event.target.value })
    }
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()

    login(form.username, form.password).catch(error => {
      if (isServerApiError(error)) {
        setForm({ ...form, error: error.response.data.error })
      } else {
        throw error
      }
    })
  }

  if (currentUser) {
    return (
      <div>
        Logged in as: {currentUser.username}
        <button onClick={() => logout()}>Logout</button>
      </div>
    )
  }

  if (fetchingUser) {
    return (
      <div>Loading...</div>
    )
  }

  return (
    <form onSubmit={handleSubmit}>
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
  )
}
