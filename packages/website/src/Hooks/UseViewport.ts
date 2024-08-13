import { MutableRefObject, useEffect, useState } from 'react'

export const useContainerDimensions = (elementRef: MutableRefObject<HTMLElement | null>) => {
  const [ dimensions, setDimensions ] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const getDimensions = () => {
      return {
        width: elementRef?.current?.offsetWidth || 0,
        height: elementRef?.current?.offsetHeight || 0,
      }
    }

    const handleResize = () => {
      setDimensions(getDimensions())
    }

    if (elementRef.current) {
      setDimensions(getDimensions())
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [ elementRef ])

  return dimensions
}
