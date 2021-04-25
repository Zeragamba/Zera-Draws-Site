import React, { FC } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import classnames from 'classnames';

import { Routes } from '../routes';

import styles from './admin-nav.module.scss';

export const AdminNav: FC = () => {
  return (
    <div className={styles.page}>
      <NavItem exact to={Routes.Home} label="< Back" />
      <NavItem to={Routes.Upload} label="Upload" />
    </div>
  );
};

interface NavItemProps {
  exact?: boolean;
  to: string;
  label: string;
}

const NavItem: FC<NavItemProps> = ({ to, exact, label }) => {
  const history = useHistory(

  );
  const location = useLocation();

  const activePath = location.pathname;
  const linkActive = exact ? activePath === to : activePath.startsWith(to);

  return (
    <div
      className={classnames(styles.navItem, { [styles.navItemActive]: linkActive })}
      onClick={() => history.push(to)}
    >{label}</div>
  );
};
