import { createTheme, ThemeProvider } from '@mui/material'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { CSSProperties, FC } from 'react'

import { AppRouter } from './Pages/AppRouter'

import styles from './App.module.scss'

const darkTheme = createTheme({
  spacing: 4,
  palette: {
    mode: 'dark',
  },
})

const queryClient = new QueryClient()

const rootStyles = {
  '--spacing': darkTheme.spacing(),
} as CSSProperties

export const App: FC = () => {
  return (
    <div className={styles.root} style={rootStyles}>
      <ThemeProvider theme={darkTheme}>
        <QueryClientProvider client={queryClient}>
          <div id="app-root" className={styles.app}>
            <AppRouter />
          </div>

          <div id="modal-root" />
        </QueryClientProvider>
      </ThemeProvider>
    </div>
  )
}

export default App
