import { Box, BoxProps } from '@mui/material'
import classnames from 'classnames'
import { FC } from 'react'

import styles from './Glass.module.scss'

type GlassProps = BoxProps

export const Glass: FC<GlassProps> = ({
  children,
  className,
  ...boxProps
}) => (
  <Box className={classnames(styles.glass, className)} padding={1} {...boxProps}>
    {children}
  </Box>
)
