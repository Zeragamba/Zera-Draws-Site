import { CSSProperties, FC, ImgHTMLAttributes } from 'react'

import { useImage$ } from '../../../../Lib'
import { Spinner } from '../Shared/Spinner/Spinner'

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
