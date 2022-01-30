import { FC } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { AdminPage } from './admin/admin-page';
import { HomePage } from './home-page/home-page';
import { UploadPage } from './admin/upload-page';

import styles from './app.module.scss';

export const App: FC = () => {
  return (
    <BrowserRouter>
      <div id="app-root" className={styles.app}>
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="/admin" element={<AdminPage />}>
            <Route path="upload" element={<UploadPage />} />
            <Route path="" element={<Navigate to={'/admin/upload'} />} />
          </Route>

        </Routes>
      </div>

      <div id="modal-root" />
    </BrowserRouter>
  );
};

export default App;
