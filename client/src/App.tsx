import { Box, ThemeProvider } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import React, { FC } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { RouterProvider } from 'react-router-dom'

import { Config } from './Config'
import { AgeGateProvider, PreloadProvider, queryClient } from './Lib'
import { appRouter } from './Theme/ZeraDark/AppRouter'
import { appStyles } from './Theme/ZeraDark/AppStyles'
import { muiTheme } from './Theme/ZeraDark/MuiTheme'

export const App: FC = () => {
  return (
    <AgeGateProvider>
      <ThemeProvider theme={muiTheme}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <QueryClientProvider client={queryClient}>
            <PreloadProvider />

            <DndProvider backend={HTML5Backend}>
              <Box id="app-root" sx={appStyles}>
                <RouterProvider router={appRouter} />
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
