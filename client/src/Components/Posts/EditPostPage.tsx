import { FC } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'

import { EditPostForm } from './Forms/EditPostForm'
import { usePost$ } from './PostsApi'
import { isNotFoundError } from '../../Lib/ServerApi'
import { ErrorAlert } from '../../Lib/UI/ErrorAlert'
import { QueryGate } from '../../Lib/UI/QueryGate'
import { AdminLayout } from '../Admin/AdminLayout'

export const EditPostPage: FC = () => {
  const navigate = useNavigate()
  const postId = useParams().postId as string
  const post$ = usePost$({ postId })

  const onCancel = () => {
    if (history.length > 1) {
      navigate(-1)
    } else {
      navigate(`/post/${postId}`)
    }
  }

  return (
    <AdminLayout>
      <QueryGate
        query={post$}
        renderError={(error) => {
          if (isNotFoundError(error)) {
            return <Navigate to={'/'} replace />
          } else {
            return <ErrorAlert error={error} />
          }
        }}
        renderData={(post) => (
          <EditPostForm
            post={post}
            onSaved={(post) => navigate(`/post/${post.slug}`)}
            onCancel={onCancel}
            onDelete={() => navigate('/archive')}
          />
        )}
      />
    </AdminLayout>
  )
}
