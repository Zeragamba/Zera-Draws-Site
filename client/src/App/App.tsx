import { Box } from '@mui/material'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import React, { FC } from 'react'
import { RouterProvider } from 'react-router-dom'

import { AppProviders } from './AppProviders'
import { AppTheme } from './AppTheme'
import { Config } from '../Config'

interface AppProps {
  theme: AppTheme
}

export const App: FC<AppProps> = ({ theme }) => {
  return (
    <AppProviders theme={theme}>
      <Box id="app-root" sx={theme.appStyles}>
        <RouterProvider router={theme.appRouter} />
      </Box>

      <div id="modal-root" />

      {Config.ENVIRONMENT === 'development' && <ReactQueryDevtools initialIsOpen={false} />}
    </AppProviders>
  )
}
