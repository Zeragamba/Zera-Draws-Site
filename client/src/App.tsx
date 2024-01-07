import { Box, ThemeProvider } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import React, { FC } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { RouterProvider } from 'react-router-dom'

import { appRouter } from './AppRouter'
import { AgeGateProvider } from './Components/User/AgeGate'
import { Config } from './Config'
import { PreloadProvider } from './Lib/PreloadProvider'
import { queryClient } from './Lib/QueryClient'
import { SiteTheme } from './Theme/ZeraDark'

export const App: FC = () => {
  return (
    <AgeGateProvider>
      <ThemeProvider theme={SiteTheme.MuiTheme}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <QueryClientProvider client={queryClient}>
            <PreloadProvider />

            <DndProvider backend={HTML5Backend}>
              <Box id="app-root" sx={SiteTheme.AppStyles}>
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
