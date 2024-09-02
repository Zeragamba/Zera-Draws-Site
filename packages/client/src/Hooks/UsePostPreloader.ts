import { PostData, useImagePreloader } from "../Lib"

interface PostPreloaderProps {
  post: PostData
  imageSize?: string
}

export type UsePostPreloader = (options: PostPreloaderProps) => void

export function usePostPreloader(): UsePostPreloader {
  const imagePreloader = useImagePreloader()

  return ({ post, imageSize = "high" }) => {
    post.images.map((image) => imagePreloader({ image, size: imageSize }))
  }
}
