import { FC } from 'react'

import { usePicture } from '../Lib/ServerApi'
import { Glass } from '../UI/Glass'
import { Overlay } from '../UI/Overlay'

import styles from './ViewDialog.module.scss'


interface ViewDialogProps {
  open?: boolean
  pictureId: string

  onClose(): void
}

export const ViewDialog: FC<ViewDialogProps> = ({
  open = false,
  pictureId,
  onClose,
}) => {
  const pictureQuery = usePicture({ pictureId })

  return (
    <Overlay open={open} onClose={onClose}>
      {pictureQuery.isLoading && <div>Loading...</div>})
      {pictureQuery.isError && <div>Error Loading Picture :(</div>}(
      {pictureQuery.data && (
        <>
          <Glass className={styles.imgWrapper}>
            <img className={styles.img} src={pictureQuery.data.srcs.high} />
          </Glass>
          <Glass className={styles.descWrapper}>
            <div className={styles.title}>{pictureQuery.data.title}</div>
            <div className={styles.date}>{pictureQuery.data.date}</div>
            <div className={styles.tags}>{pictureQuery.data.tags?.join(', ')}</div>
          </Glass>
        </>
      )}
    </Overlay>
  )
}
