import { Button, Stack } from '@mui/material'
import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

import { useCurrentUser, useLogout } from '../User/UsersApi'
import { Glass } from './Glass'

export const AppNavBar: FC = () => {
  const navigate = useNavigate()
  const userQuery = useCurrentUser()
  const logoutQuery = useLogout()
  const currentUser = userQuery.data
  const isAdmin = currentUser?.admin || false

  return (
    <Glass>
      <Stack gap={1} padding={1} direction="row" sx={{ justifyContent: 'space-between' }}>
        <Stack gap={1} className="left" direction="row" style={{ alignItems: 'center' }}>
          <Button onClick={() => navigate('/')}>Home</Button>
        </Stack>
        <Stack gap={1} className="right" direction="row" style={{ alignItems: 'center' }}>
          {userQuery.isFetching && <div>Loading</div>}

          {!currentUser ? (
            <Button onClick={() => navigate('/login')}>Login</Button>
          ) : (
            <>
              {currentUser.username}
              <Button onClick={() => logoutQuery.mutate({})}>Logout</Button>
            </>
          )}

          {isAdmin && (
            <Button onClick={() => navigate('/post/new')}>Create Post</Button>
          )}
        </Stack>
      </Stack>
    </Glass>
  )
}
