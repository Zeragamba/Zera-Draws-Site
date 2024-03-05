import React, { FC } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'

import { EditPostForm } from './Forms/EditPostForm'
import { ErrorAlert, isNotFoundError, QueryGate, useCurrentUser, useIsAdmin, usePost$ } from '../../../Lib'
import { AuthorizingPage } from '../Users/Login/AuthenticatingPage'
import { LoginPage } from '../Users/Login/LoginPage'

export const EditPostPage: FC = () => {
  const userQuery = useCurrentUser()
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
        <EditPostForm
          post={post}
          onSaved={(post) => navigate(`/post/${post.slug}`)}
          onCancel={() => navigate(-1)}
          onDelete={() => navigate('/archive')}
        />
      )}
    />
  )
}
