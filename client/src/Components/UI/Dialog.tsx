import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Component, MouseEventHandler, ReactNode } from 'react'
import ReactDOM from 'react-dom'

import styles from './Overlay.module.scss'

interface ModelProps {
  open?: boolean
  title?: string
  children: ReactNode

  onClose(): void
}

export class Dialog extends Component<ModelProps> {
  el: Element
  modalRoot: HTMLElement | null

  constructor(props: ModelProps) {
    super(props)
    this.el = document.createElement('div')
    this.modalRoot = document.getElementById('modal-root')
  }

  render(): ReactNode {
    if (!this.props.open) return null
    if (!this.modalRoot) return null

    const onOverlayClick: MouseEventHandler<HTMLDivElement> = (event) => {
      event.preventDefault()
      if (event.target === event.currentTarget) {
        this.props.onClose()
      }
    }

    const wrapper = (
      <div className={styles.curtain} onClick={onOverlayClick}>
        <div className={styles.wrapper}>
          <div className={styles.closeBtn} onClick={this.props.onClose}>
            <FontAwesomeIcon icon={faTimes} />
          </div>
          {this.props.children}
        </div>
      </div>
    )

    return ReactDOM.createPortal(wrapper, this.modalRoot)
  }
}
