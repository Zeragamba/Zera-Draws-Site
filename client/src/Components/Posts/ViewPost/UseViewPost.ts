import { MouseEventHandler, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { ImageData } from '../../Images/ImageData'
import { useIsMobile } from '../../UI/ScreenSize'
import { useRecordView } from '../../Views/ViewHooks'
import { PostData } from '../PostData'
import { useNextPost, usePrevPost } from '../PostsApi'
import { usePostPreloader } from '../UsePostPreloader'

export type UseViewPostOptions = {
  post: PostData
  onPostChange: (newPost: PostData) => void
}

export type UseViewPostReturn = {
  currentImage: ImageData
  setCurrentImage: (image: ImageData) => void
  currentImageSrc: string

  nextPost?: PostData
  prevPost?: PostData

  onNextPost: () => void
  onPrevPost: () => void

  onEdit: () => void

  onImageClick: MouseEventHandler<HTMLElement>
}

export type UseViewPost = (options: UseViewPostOptions) => UseViewPostReturn

export const useViewPost: UseViewPost = ({
  post,
  onPostChange,
}) => {
  const navigate = useNavigate()
  const isMobile = useIsMobile()

  const recordView = useRecordView()
  const preloadPost = usePostPreloader()

  const { data: nextPost } = useNextPost(post.id)
  const { data: prevPost } = usePrevPost(post.id)

  const [ currentImage, setCurrentImage ] = useState<ImageData>(post.images[0])
  useEffect(() => setCurrentImage(post.images[0]), [ post ])
  const currentImageSrc = currentImage.srcs.high || currentImage.srcs.full

  recordView(post.id)

  if (nextPost) preloadPost({ post: nextPost })
  if (prevPost) preloadPost({ post: prevPost })

  const onNextPost = () => nextPost && onPostChange(nextPost)
  const onPrevPost = () => prevPost && onPostChange(prevPost)

  const onEdit = () => {
    navigate(`/post/${post.id}/edit`)
  }

  const onImageClick: MouseEventHandler<HTMLElement> = (event) => {
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

  return {
    currentImage,
    setCurrentImage,
    currentImageSrc,

    nextPost,
    prevPost,

    onNextPost,
    onPrevPost,

    onEdit,

    onImageClick,
  }
}