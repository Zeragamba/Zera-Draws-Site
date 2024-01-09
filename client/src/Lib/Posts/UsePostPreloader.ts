import { PostData } from './PostData'
import { useImagePreloader } from '../Images/UseImagePreloader'

interface PostPreloaderProps {
  post: PostData
  imageSize?: string
}

export type UsePostPreloader = (options: PostPreloaderProps) => void

export function usePostPreloader(): UsePostPreloader {
  const imagePreloader = useImagePreloader()

  return ({ post, imageSize = 'high' }) => {
    post.images.map((image) => imagePreloader({ image, size: imageSize }))
  }
}
