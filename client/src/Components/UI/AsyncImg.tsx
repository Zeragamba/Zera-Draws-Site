import { CSSProperties, FC, ImgHTMLAttributes } from 'react'

import { Spinner } from './Spinner'
import { useImage$ } from '../Images/ImageApi/ImageQueries'

type AsyncImageProps = ImgHTMLAttributes<HTMLImageElement>

export const AsyncImg: FC<AsyncImageProps> = ({
  alt,
  src,
  style = {},
  ...imgProps
}) => {
  const { data: image } = useImage$(src)

  const imgStyles = { ...style }
  if (!image) imgStyles.display = 'none'

  return (
    <>
      {!image ? (
        <Spinner />
      ) : (
        <img {...imgProps} src={image.src} alt={alt} style={imgStyles as CSSProperties} />
      )}
    </>
  )
}
