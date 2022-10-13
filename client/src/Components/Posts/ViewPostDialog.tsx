import { FC } from 'react'

import { Overlay } from '../UI/Overlay'
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
    <Overlay open={open} onClose={onClose}>
      <ViewPost postId={postId} />
    </Overlay>
  )
}
