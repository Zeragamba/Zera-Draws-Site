import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import classnames from 'classnames';

import { Routes } from '../routes';
import { Glass } from '../ui/glass';

import styles from './admin-nav.module.scss';

export const AdminNav: FC = () => {
  return (
    <Glass style={{ padding: 0 }}>
      <NavItem exact to={Routes.Home} label="< Back" />
      <NavItem to={Routes.Upload} label="Upload" />
    </Glass>
  );
};

interface NavItemProps {
  exact?: boolean;
  to: string;
  label: string;
}

const NavItem: FC<NavItemProps> = ({ to, exact, label }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const activePath = location.pathname;
  const linkActive = exact ? activePath === to : activePath.startsWith(to);

  return (
    <div
      className={classnames(styles.navItem, { [styles.navItemActive]: linkActive })}
      onClick={() => navigate(to)}
    >{label}</div>
  );
};
