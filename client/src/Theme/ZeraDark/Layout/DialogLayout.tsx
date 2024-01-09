import classnames from 'classnames'

import { Layout } from './Layout'

import styles from './DialogLayout.module.scss'

export const DialogLayout: Layout = ({ children, className, ...divProps }) => {
  return (
    <div className={classnames(className, styles.DialogLayout)} {...divProps}>
      {children}
    </div>
  )
}
