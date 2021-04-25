import React, { FC } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { AdminPage } from './admin/admin-page';
import { HomePage } from './home-page/home-page';

import styles from './app.module.scss';

export const App: FC = () => {
  return (
    <Router>
      <div className={styles.app}>
        <Switch>
          <Route path="/admin" component={AdminPage} />
          <Route path="/" component={HomePage} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
