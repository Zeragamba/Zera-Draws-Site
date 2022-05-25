import { FC, ReactNode } from 'react'

import { logout } from '../../../Store/Actions/UserActions'
import { useAppDispatch, useAppSelector } from '../../../Store/AppState'
import { Glass } from '../../../UI/Glass'
import { LoginForm } from './LoginForm'


export const LoginPage: FC = () => {
  const dispatch = useAppDispatch()
  const { currentUser, fetching } = useAppSelector(state => state.user)

  const onLogout = () => {
    dispatch(logout())
  }

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
        <button onClick={onLogout}>Logout</button>
      </Wrapper>
    )
  }

  if (fetching) {
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
