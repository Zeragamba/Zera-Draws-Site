import { RefObject, useEffect, useState } from 'react'

export const noOp = (): void => {
  /* noop */
}

export function isInViewport(element: HTMLElement): boolean {
  const rect = element.getBoundingClientRect()

  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  )
}

export function useInViewport(markerRef: RefObject<HTMLElement | null>): boolean {
  const [ inViewport, setInViewport ] = useState<boolean>(false)

  useEffect(() => {
    const onScroll = () => {
      if (!markerRef.current) return
      const marker = markerRef.current
      setInViewport(isInViewport(marker))
    }

    const intervalId = setInterval(onScroll, 1000)

    return () => {
      clearInterval(intervalId)
    }
  }, [ markerRef, inViewport ])

  return inViewport
}
