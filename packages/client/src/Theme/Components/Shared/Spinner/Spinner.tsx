import classnames from "classnames"
import { FC } from "react"

import spinnerGif from "./Spinner.gif"

import styles from "./Spinner.module.scss"

interface SpinnerProps {
  className?: string
}

export const Spinner: FC<SpinnerProps> = ({ className }) => {
  return (
    <div className={classnames(className, styles.spinner)}>
      <img src={spinnerGif} alt="Loading..." />
    </div>
  )
}

export const LoadingSpinner = Spinner
