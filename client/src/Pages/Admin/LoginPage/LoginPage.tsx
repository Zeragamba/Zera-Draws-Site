import { FC, ReactNode } from 'react'

import { userLoggedOut } from '../../../Store/Actions/UserActions'
import { useAppDispatch, useAppSelector } from '../../../Store/AppState'
import { Glass } from '../../../UI/Glass'
import { LoginForm } from './LoginForm'


export const LoginPage: FC = () => {
  const dispatch = useAppDispatch()
  const currentUser = useAppSelector(state => state.currentUser)

  const onLogout = () => {
    dispatch(userLoggedOut())
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

  return (
    <LoginForm />
  )
}
