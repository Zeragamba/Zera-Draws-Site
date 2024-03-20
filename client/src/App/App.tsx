import { Box, ThemeProvider } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import React, { FC } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { RouterProvider } from 'react-router-dom'

import { AgeGateProvider } from './AgeGateProvider'
import { AppTheme } from './AppTheme'
import { PreloadProvider } from './PreloadProvider'
import { queryClient } from './QueryClient'
import { Config } from '../Config'

interface AppProps {
  theme: AppTheme
}

export const App: FC<AppProps> = ({ theme }) => {
  return (
    <AgeGateProvider>
      <ThemeProvider theme={theme.muiTheme}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <QueryClientProvider client={queryClient}>
            <PreloadProvider />

            <DndProvider backend={HTML5Backend}>
              <Box id="app-root" sx={theme.appStyles}>
                <RouterProvider router={theme.appRouter} />
              </Box>

              <div id="modal-root" />

              {Config.ENVIRONMENT === 'development' && <ReactQueryDevtools initialIsOpen={false} />}
            </DndProvider>
          </QueryClientProvider>
        </LocalizationProvider>
      </ThemeProvider>
    </AgeGateProvider>
  )
}

export default App
