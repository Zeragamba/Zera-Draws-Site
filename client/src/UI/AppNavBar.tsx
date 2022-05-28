import { Button, Stack } from '@mui/material'
import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

import { userLoggedOut } from '../Store/Actions/UserActions'
import { useAppDispatch, useAppSelector } from '../Store/AppState'
import { selectCurrentUser } from '../Store/Reducers/CurrentUserReducer'
import { Glass } from './Glass'

export const AppNavBar: FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const currentUser = useAppSelector(state => selectCurrentUser(state))
  const isAdmin = useAppSelector(state => selectCurrentUser(state)?.admin || false)

  return (
    <Glass>
      <Stack gap={1} padding={1} direction="row" sx={{ justifyContent: 'space-between' }}>
        <Stack gap={1} className="left" direction="row" style={{ alignItems: 'center' }}>
          <Button onClick={() => navigate('/')}>Home</Button>
        </Stack>
        <Stack gap={1} className="right" direction="row" style={{ alignItems: 'center' }}>

          {!currentUser ? (
            <Button onClick={() => navigate('/login')}>Login</Button>
          ) : (
            <>
              {currentUser.username}
              <Button onClick={() => dispatch(userLoggedOut())}>Logout</Button>
            </>
          )}

          {isAdmin && (
            <Button onClick={() => navigate('/admin/upload')}>Upload</Button>
          )}
        </Stack>
      </Stack>
    </Glass>
  )
}
