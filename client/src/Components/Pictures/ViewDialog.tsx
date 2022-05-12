import { FC } from 'react'

import { Picture , PicturesApi , useApi } from '../../Lib/ServerApi'
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
  const { fetching, error, data: picture } = useApi<Picture>(
    () => {
      if (!open || !pictureId) return
      return PicturesApi.fetchPicture(pictureId)
    }, [open, pictureId],
  )

  return (
    <Overlay open={open} onClose={onClose}>
      {fetching ? (
        <div>Loading...</div>
      ) : (
        <>
          {error && (
            <div>{error.message}</div>
          )}

          {picture && (
            <>
              <Glass className={styles.imgWrapper}>
                <img className={styles.img} src={picture.srcs.high} />
              </Glass>
              <Glass className={styles.descWrapper}>
                <div className={styles.title}>{picture.title}</div>
                <div className={styles.date}>{picture.date}</div>
                <div className={styles.tags}>{picture.tags?.join(', ')}</div>
              </Glass>
            </>
          )}
        </>
      )}
    </Overlay>
  )
}
