import { useEffect } from "react"
import { ImageData } from "../Images"
import { MathUtils } from "../MathUtils"
import { usePostContext } from "./PostHooks"

export interface PostImageCtrl {
  images: ImageData[]
  currentIndex: number
  currentImage: ImageData
  currentImageSrc: string
  currentImageNum: number
  totalImages: number
  onChangeImage: (newIndex: ImageData | number) => void
  hasNextImage: boolean
  onNextImage: () => void
  hasPrevImage: boolean
  onPrevImage: () => void
}

export const usePostImageCtrl = (): PostImageCtrl => {
  const { post, imageIndex, setImageIndex } = usePostContext()
  const images = post.images

  useEffect(() => setImageIndex(0), [setImageIndex, post])

  const totalImages = images.length
  const currentImage = images[MathUtils.clamp(imageIndex, 0, totalImages - 1)]
  const currentImageNum = imageIndex + 1
  const currentImageSrc = currentImage.srcs.high || currentImage.srcs.full
  const hasNextImage = imageIndex < totalImages - 1
  const hasPrevImage = imageIndex > 0

  const onChangeImage = (newImage: ImageData | number) => {
    if (typeof newImage === "number") {
      setImageIndex(MathUtils.clamp(newImage, 0, totalImages - 1))
    } else {
      setImageIndex(images.findIndex((i) => i.id === newImage.id) || 0)
    }
  }

  const onNextImage = () => onChangeImage(imageIndex + 1)
  const onPrevImage = () => onChangeImage(imageIndex - 1)

  return {
    images,
    currentIndex: imageIndex,
    currentImage,
    currentImageSrc,
    currentImageNum,
    totalImages,
    hasNextImage,
    hasPrevImage,
    onChangeImage,
    onNextImage,
    onPrevImage,
  }
}
