import { FC, ReactNode } from 'react'

import { EditableImage, Image, Post } from '../../Lib/ServerApi'
import { Glass } from '../UI/Glass'
import { EditPostImages } from './EditPostImages'

import styles from './PostForm.module.scss'

interface PostFormProps {
  post: Post
  actions: ReactNode
  onImageRemove: (image: Image) => void
  onImageEdit: (image: Image, changes: Partial<EditableImage>) => void
  onImageAdd: (image: Required<EditableImage>) => void
  onEdit: (post: Partial<Post>) => void
}

export const PostForm: FC<PostFormProps> = ({
  post,
  actions,
  onImageRemove,
  onImageEdit,
  onImageAdd,
  onEdit,
}) => {
  return (
    <div className={styles.PostForm}>
      <div className={styles.LeftColumn}>
        <EditPostImages images={post.images} onRemove={onImageRemove} onEdit={onImageEdit} onAdd={onImageAdd} />
        <Glass>
          <div>{post.title}</div>
          <div>{post.date}</div>
          <div>{post.description}</div>
        </Glass>
      </div>
      <div className={styles.RightColumn}>
        {actions}
        <Glass display="flex" flexDirection="column" gap={2}>
          <div>
            <div>URL Slug</div>
            <div>{post.slug}</div>
          </div>
          <div>
            <div>Tags</div>
            <div>Select list</div>
          </div>
          <div>
            <div>Galleries</div>
            <div>Select list</div>
          </div>
        </Glass>
      </div>
    </div>
  )
}
