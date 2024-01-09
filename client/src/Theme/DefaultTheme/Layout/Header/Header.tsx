import { Box, Stack, Typography } from '@mui/material'
import React, { FC, MouseEventHandler } from 'react'
import { useNavigate } from 'react-router-dom'

import { useIsMobile } from '../../../../Lib'
import { AppNavBar } from '../NavBar/AppNavBar'

export const Header: FC = () => {
  const isMobile = useIsMobile()
  const navigate = useNavigate()

  const onTitleClick: MouseEventHandler = (event) => {
    event.preventDefault()
    navigate('/')
  }

  return (
    <Stack component="header" sx={{ width: '100%' }}>
      <Box
        component="a"
        href="/"
        onClick={onTitleClick}
        sx={{
          cursor: 'pointer',
          backgroundColor: 'primary.dark',
          color: 'primary.light',
          textDecoration: 'none',
          padding: 2,
        }}
      >
        <Typography
          sx={{ width: '100%', textAlign: 'center', fontSize: '3rem', margin: 'auto' }}
          variant="h1"
        >
          {isMobile ? (
            <>Zeragamba</>
          ) : (
            <>Zeragamba Draws</>
          )}
        </Typography>
      </Box>

      <AppNavBar />
    </Stack>
  )
}
