import { FC, ReactNode } from 'react'

import { Glass } from '../../../UI/Glass'
import { useCurrentUser, useLogout } from '../../../User/UserState/Hooks'
import { LoginForm } from './LoginForm'


export const LoginPage: FC = () => {
  const logout = useLogout()
  const [ currentUser, fetchingUser ] = useCurrentUser()

  const Wrapper: FC<{ children: ReactNode }> = ({ children }) => {
    return (
      <Glass style={{ padding: 8 }}>
        {children}
      </Glass>
    )
  }

  if (currentUser) {
    return (
      <Wrapper>
        Logged in as: {currentUser.username}
        <button onClick={() => logout()}>Logout</button>
      </Wrapper>
    )
  }

  if (fetchingUser) {
    return (
      <Wrapper>
        Loading...
      </Wrapper>
    )
  }

  return (
    <Wrapper>
      <LoginForm />
    </Wrapper>
  )
}
