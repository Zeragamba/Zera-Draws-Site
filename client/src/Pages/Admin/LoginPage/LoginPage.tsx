import { FC } from 'react'

import { useLogin } from '../../../User/UserContext'

export const LoginPage: FC = () => {
  const login = useLogin()

  return (
    <div>
      <button onClick={() => login({ loggedIn: true, admin: true })}>Login Admin</button>
      <button onClick={() => login({ loggedIn: true, admin: false })}>Login Guest</button>
    </div>
  )
}
