import { FC } from 'react'

import { Post } from '../../Lib/ServerApi'
import { Glass } from '../UI/Glass'
import { PublishToggle } from './PublishToggle'

import styles from './PostForm.module.scss'

interface PostFormProps {
  post: Post
}

export const EditPostForm: FC<PostFormProps> = ({
  post,
}) => {
  return (
    <div className={styles.PostForm}>
      <div className={styles.LeftColumn}>
        <Glass>Images</Glass>
        <Glass>
          <div>{post.title}</div>
          <div>{post.date}</div>
          <div>{post.description}</div>
        </Glass>
      </div>
      <div className={styles.RightColumn}>
        <PublishToggle postId={post.id} released={post.released} />
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
