import { CSSProperties, FC, ImgHTMLAttributes, useEffect, useState } from 'react'

import { Spinner } from './Spinner'

type AsyncImageProps = ImgHTMLAttributes<HTMLImageElement>

export const AsyncImg: FC<AsyncImageProps> = ({
  alt,
  src,
  style = {},
  ...imgProps
}) => {
  const [ imgLoading, setImgLoading ] = useState<boolean>(true)

  useEffect(() => {
    if (!src) return

    const image = new Image()
    image.onload = () => setImgLoading(false)
    image.src = src

    setImgLoading(true)
  }, [ src ])

  const imgStyles = { ...style }
  if (imgLoading) imgStyles.display = 'none'

  return (
    <>
      {imgLoading && <Spinner />}
      <img {...imgProps} src={src} alt={alt} style={imgStyles as CSSProperties} loading={'lazy'} />
    </>
  )
}
