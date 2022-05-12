import { FC } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import { AdminLayout, UploadPage } from './Pages/Admin'
import { HomePage } from './Pages/HomePage'

import styles from './App.module.scss'

export const App: FC = () => {
  return (
    <BrowserRouter>
      <div id="app-root" className={styles.app}>
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="/admin" element={<AdminLayout />}>
            <Route path="upload" element={<UploadPage />} />
            <Route path="" element={<Navigate to={'/admin/upload'} />} />
          </Route>

        </Routes>
      </div>

      <div id="modal-root" />
    </BrowserRouter>
  )
}

export default App
