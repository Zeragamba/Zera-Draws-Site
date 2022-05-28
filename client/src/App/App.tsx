import { createTheme, ThemeProvider } from '@mui/material'
import { FC } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import { appStore } from '../Store/AppState'
import { AppRouter } from './AppRouter'

import styles from './App.module.scss'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
})

export const App: FC = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <Provider store={appStore}>
        <BrowserRouter>
          <div id="app-root" className={styles.app}>
            <AppRouter />
          </div>

          <div id="modal-root" />
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  )
}

export default App
