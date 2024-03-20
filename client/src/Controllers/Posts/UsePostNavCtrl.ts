import { MouseEventHandler } from 'react'
import { useNavigate } from 'react-router-dom'

import { usePostContext } from '../../Contexts'
import { useIsAdmin, useIsMobile, usePostPreloader } from '../../Hooks'
import { getPostUrl } from '../../Lib/PostUtil'
import { PostData } from '../../Models'
import { useNextPost$, usePrevPost$ } from '../../Queries'

export interface PostNavCtrl {
  onPostImageClick: MouseEventHandler<HTMLElement>
  onChangePost: (newPost: PostData) => void
  hasAltImages: boolean

  hasNextPost: boolean
  onNextPost: () => void
  nextPost?: PostData
  nextPostUrl?: string

  hasPrevPost: boolean
  onPrevPost: () => void
  prevPost?: PostData
  prevPostUrl?: string

  canEdit: boolean
  onEditPost: () => void
}

export const usePostNavCtrl = (): PostNavCtrl => {
  const isMobile = useIsMobile()
  const isAdmin = useIsAdmin()
  const navigate = useNavigate()
  const { post, tag, gallery } = usePostContext()
  const preloadPost = usePostPreloader()

  const { data: nextPost } = useNextPost$({ postId: post.id })
  const { data: prevPost } = usePrevPost$({ postId: post.id })

  const hasNextPost = !!nextPost
  const onNextPost = () => nextPost && onChangePost(nextPost)
  const nextPostUrl = hasNextPost ? getPostUrl({
    postId: post.slug,
    tagId: tag?.slug,
    galleryId: gallery?.slug,
  }) : undefined

  const hasPrevPost = !!prevPost
  const onPrevPost = () => prevPost && onChangePost(prevPost)
  const prevPostUrl = hasPrevPost ? getPostUrl({
    postId: post.slug,
    tagId: tag?.slug,
    galleryId: gallery?.slug,
  }) : undefined

  const onEditPost = () => isAdmin && navigate(`/post/${post.id}/edit`)

  const onPostImageClick: MouseEventHandler<HTMLElement> = (event) => {
    if (!isMobile) return

    const clickTarget = event.currentTarget
    const clickTargetWidth = clickTarget.offsetWidth
    const xClick = event.clientX - clickTarget.getBoundingClientRect().left

    if (xClick < clickTargetWidth / 3) {
      onNextPost()
    } else {
      onPrevPost()
    }
  }

  const onChangePost = (nextPost: PostData) => {
    return navigate(getPostUrl({
      postId: nextPost.slug,
      tagId: tag?.slug,
      galleryId: gallery?.slug,
    }))
  }

  if (nextPost) preloadPost({ post: nextPost })
  if (prevPost) preloadPost({ post: prevPost })

  return {
    onPostImageClick,
    onChangePost,
    hasAltImages: post.images.length > 1,
    hasNextPost,
    nextPost,
    nextPostUrl,
    onNextPost,
    hasPrevPost,
    prevPost,
    prevPostUrl,
    onPrevPost,
    canEdit: isAdmin,
    onEditPost,
  }
}
