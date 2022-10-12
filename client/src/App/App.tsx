import { createTheme, ThemeProvider } from '@mui/material'
import { FC } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter } from 'react-router-dom'

import { AppRouter } from './AppRouter'

import styles from './App.module.scss'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
})

const queryClient = new QueryClient()

export const App: FC = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <div id="app-root" className={styles.app}>
            <AppRouter />
          </div>

          <div id="modal-root" />
        </BrowserRouter>
      </QueryClientProvider>
    </ThemeProvider>
  )
}

export default App
