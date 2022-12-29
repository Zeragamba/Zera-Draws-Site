import { FC, useState } from 'react'

import { useHistory } from '../../../App/AppRouter'
import { Dialog } from '../../UI/Dialog'
import { Post } from '../Post'
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
  const history = useHistory()
  const [ currentPostId, setCurrentPostId ] = useState<Post['id']>(postId)

  const onPostChange = (post: Post) => {
    setCurrentPostId(post.id)
    history.replace(`/post/${post.slug}`)
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <ViewPost postId={currentPostId} onPostChange={onPostChange} />
    </Dialog>
  )
}
