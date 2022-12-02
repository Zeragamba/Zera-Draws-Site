import { FC } from 'react'

import { Dialog } from '../../UI/Dialog'
import { ViewPost } from './ViewPost'


interface ViewDialogProps {
  open?: boolean
  postId: string

  onClose(): void
}

export const ViewPostDialog: FC<ViewDialogProps> = ({
  open = false,
  postId,
  onClose,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <ViewPost postId={postId} />
    </Dialog>
  )
}
