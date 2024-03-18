import React, { FC } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'

import { ParamsPostProvider } from '../../../../Contexts'
import { isNotFoundError, useIsAdmin } from '../../../../Lib'
import { useCurrentUser$, usePost$ } from '../../../../Queries'
import { EditPostForm, ErrorAlert, QueryGate } from '../../Components'
import { LoadingPage } from '../LoadingPage'
import { AuthorizingPage, LoginPage } from '../Users'

export const EditPostPage: FC = () => {
  const userQuery = useCurrentUser$()
  const isAdmin = useIsAdmin()

  const navigate = useNavigate()
  const postId = useParams().postId as string
  const post$ = usePost$({ postId })

  if (userQuery.isFetching) return <AuthorizingPage />
  if (!userQuery.data) return <LoginPage />
  if (!isAdmin) return <Navigate to={'/'} />

  return (
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
        <ParamsPostProvider renderPending={<LoadingPage />}>
          <EditPostForm
            post={post}
            onSaved={(post) => navigate(`/post/${post.slug}`)}
            onCancel={() => navigate(-1)}
            onDelete={() => navigate('/archive')}
          />
        </ParamsPostProvider>
      )}
    />
  )
}
