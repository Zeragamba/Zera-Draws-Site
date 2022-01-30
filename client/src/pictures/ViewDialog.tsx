import { FC } from 'react';
import { Overlay } from '../ui/Overlay';
import { Pictures } from '../lib/server-api/hooks';
import { useApi } from '../lib/server-api/hooks/use-server-api';
import { Picture } from '../lib/server-api';

import styles from './ViewDialog.module.scss';
import { Glass } from '../ui/glass';

interface ViewDialogProps {
  open?: boolean,
  pictureId: string,

  onClose(): void,
}

export const ViewDialog: FC<ViewDialogProps> = ({
  open = false,
  pictureId,
  onClose,
}) => {
  const { fetching, error, data: picture } = useApi<Picture>(
    () => {
      if (!open || !pictureId) return;
      return Pictures.fetchPicture(pictureId);
    }, [open, pictureId],
  );

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
  );
};
