import { CSSProperties, FC, ImgHTMLAttributes, ReactEventHandler, useEffect, useState } from 'react'

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
    setImgLoading(true)
  }, [ src ])

  const onImgLoad: ReactEventHandler<HTMLImageElement> = (event) => {
    setImgLoading(false)
    if (imgProps.onLoad) imgProps.onLoad(event)
  }

  const imgStyles = { ...style }
  if (imgLoading) imgStyles.display = 'none'

  return (
    <>
      {imgLoading && <Spinner />}
      <img {...imgProps} src={src} alt={alt} style={imgStyles as CSSProperties} onLoad={onImgLoad} />
    </>
  )
}
