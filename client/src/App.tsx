import { Box, SxProps, ThemeProvider } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import React, { FC } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import backgroundImage from './Assets/dark_geometric.png'
import { AgeGateProvider } from './Components/User/AgeGate'
import { Config } from './Config'
import { ErrorHandlerProvider } from './Lib/ErrorHandler'
import { queryClient } from './Lib/QueryClient'
import { darkTheme } from './Lib/Theme'
import { routes } from './Routes'

const AppStyles: SxProps = {
  overflow: 'auto',
  width: '100vw',
  height: '100vh',
  backgroundImage: `url(${backgroundImage})`,
  backgroundColor: 'hsl(0, 0%, 70%)',
}

export const App: FC = () => {
  return (
    <AgeGateProvider>
      <ThemeProvider theme={darkTheme}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <QueryClientProvider client={queryClient}>
            <DndProvider backend={HTML5Backend}>
              <ErrorHandlerProvider>
                <Box id="app-root" sx={AppStyles}>
                  <RouterProvider router={createBrowserRouter(routes)} />
                </Box>

                <div id="modal-root" />

                {Config.ENVIRONMENT === 'development' && <ReactQueryDevtools initialIsOpen={false} />}
              </ErrorHandlerProvider>
            </DndProvider>
          </QueryClientProvider>
        </LocalizationProvider>
      </ThemeProvider>
    </AgeGateProvider>
  )
}

export default App
