import { FC } from 'react'
import { BrowserRouter } from 'react-router-dom'

import { AppRouter } from './AppRouter'
import { UserProvider } from './User/UserContext'

import styles from './App.module.scss'

export const App: FC = () => {
  return (
    <UserProvider>
      <BrowserRouter>
        <div id="app-root" className={styles.app}>
          <AppRouter />
        </div>

        <div id="modal-root" />
      </BrowserRouter>
    </UserProvider>
  )
}

export default App
