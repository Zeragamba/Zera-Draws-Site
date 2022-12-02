import { faCheck, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, ButtonProps } from '@mui/material'
import classnames from 'classnames'
import { FC } from 'react'

import styles from './PublishToggle.module.scss'

interface PublishToggleProps extends ButtonProps {
  released: boolean
}

export const PublishToggle: FC<PublishToggleProps> = ({
  released,
  ...btnProps
}) => {
  return (
    <Button {...btnProps} className={classnames(styles.PublishToggle, btnProps.className)}>
      {released ? (
        <><FontAwesomeIcon icon={faCheck} /> Public</>
      ) : (
        <><FontAwesomeIcon icon={faEyeSlash} /> Private</>
      )}
    </Button>
  )
}
