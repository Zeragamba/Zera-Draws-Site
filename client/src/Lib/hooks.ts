import { RefObject, useEffect, useState } from 'react'

export const useResize = (ref: RefObject<HTMLElement>) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  const getDimensions = () => ({
    width: ref.current ? ref.current.offsetWidth : 0,
    height: ref.current ? ref.current.offsetHeight : 0,
  })

  useEffect(() => {
    const handleResize = () => {
      setDimensions(getDimensions())
    }

    if (ref.current) {
      handleResize()
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [ref])

  return dimensions
}
