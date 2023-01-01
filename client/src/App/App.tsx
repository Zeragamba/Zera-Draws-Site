import { ThemeProvider } from '@mui/material'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import React, { FC } from 'react'

import { queryClient } from '../Lib/QueryClient'
import { darkTheme, rootStyles } from '../Lib/Theme'
import { AppRouter } from './AppRouter'

import styles from './App.module.scss'

export const App: FC = () => {
  return (
    <div className={styles.root} style={rootStyles}>
      <ThemeProvider theme={darkTheme}>
        <QueryClientProvider client={queryClient}>
          <div id="app-root" className={styles.app}>
            <AppRouter />
          </div>

          <div id="modal-root" />

          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </ThemeProvider>
    </div>
  )
}

export default App
