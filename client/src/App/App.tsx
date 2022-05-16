import { FC } from 'react'
import { BrowserRouter } from 'react-router-dom'

import { AppProvider } from './AppProvider'
import { AppRouter } from './AppRouter'

import styles from './App.module.scss'

export const App: FC = () => {
  return (
    <AppProvider>
      <BrowserRouter>
        <div id="app-root" className={styles.app}>
          <AppRouter />
        </div>

        <div id="modal-root" />
      </BrowserRouter>
    </AppProvider>
  )
}

export default App
