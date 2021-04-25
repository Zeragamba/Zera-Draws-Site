import React, { FC } from 'react';

import { Redirect, Route, RouteComponentProps, Switch } from 'react-router-dom';
import { UploadPage } from './upload-page';
import { AdminNav } from './admin-nav';

import styles from './admin-page.module.scss';
import { Routes } from '../routes';

export const AdminPage: FC<RouteComponentProps> = ({ match }) => (
  <div className={styles.layout}>
    <div className={styles.nav}>
      <AdminNav />
    </div>
    <div className={styles.main}>
      <Switch>
        <Route path={Routes.Upload} component={UploadPage} />
        <Route path={Routes.Admin}>
          <Redirect to={Routes.Upload} />
        </Route>
      </Switch>
    </div>
  </div>
);
