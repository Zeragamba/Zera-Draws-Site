import { FC } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import { appStore } from '../Store/AppState'
import { AppRouter } from './AppRouter'

import styles from './App.module.scss'

export const App: FC = () => {
  return (
    <Provider store={appStore}>
      <BrowserRouter>
        <div id="app-root" className={styles.app}>
          <AppRouter />
        </div>

        <div id="modal-root" />
      </BrowserRouter>
    </Provider>
  )
}

export default App
