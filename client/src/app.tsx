import React, { FC } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { AdminLayout } from './admin/admin-layout';
import { HomePage } from './home-page/home-page';

import styles from './app.module.scss';

export const App: FC = () => {
  return (
    <Router>
      <div className={styles.app}>
        <Switch>
          <Route path="/admin">
            <AdminLayout />
          </Route>
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
