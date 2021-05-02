import React, { FC, HTMLAttributes } from 'react';
import classnames from 'classnames';

import styles from './glass.module.scss';

type GlassProps = HTMLAttributes<HTMLDivElement>;
export const Glass: FC<GlassProps> = ({
  children,
  className,
  ...divProps
}) => (
  <div className={classnames(styles.glass, className)}{...divProps}>
    {children}
  </div>
);

