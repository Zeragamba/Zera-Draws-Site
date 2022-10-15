import { createTheme, ThemeProvider } from '@mui/material'
import { FC } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'

import { AppRouter } from './Pages/AppRouter'

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
        <div id="app-root" className={styles.app}>
          <AppRouter />
        </div>

        <div id="modal-root" />
      </QueryClientProvider>
    </ThemeProvider>
  )
}

export default App
