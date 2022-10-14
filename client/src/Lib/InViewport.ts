import { RefObject, useEffect, useState } from 'react'

interface InViewportOptions {
  partial?: boolean
  expand?: number
}

export function isInViewport(element: HTMLElement, {
  partial = true,
  expand = 0,
}: InViewportOptions = {}): boolean {
  const targetBox = element.getBoundingClientRect()
  const parentBox = document.documentElement.getBoundingClientRect()

  if (partial) {
    return !(
      targetBox.top > parentBox.bottom + expand
      || targetBox.bottom < parentBox.top - expand
      || targetBox.left > parentBox.right + expand
      || targetBox.right < parentBox.left - expand
    )
  } else {
    return (
      targetBox.top <= parentBox.bottom + expand
      && targetBox.bottom >= parentBox.top - expand
      && targetBox.left <= parentBox.right + expand
      && targetBox.right >= parentBox.left - expand
    )
  }
}

interface InViewportHookOptions extends InViewportOptions {
  enabled?: boolean
  interval?: number
}

export function useInViewport(markerRef: RefObject<HTMLElement | null>, options: InViewportHookOptions = {}): boolean {
  const { enabled = true, interval = 1000, ...inViewportOptions } = options

  const [ inViewport, setInViewport ] = useState<boolean>(false)

  useEffect(() => {
    if (!enabled) return

    const checkViewport = () => {
      if (!markerRef.current) return
      const marker = markerRef.current
      setInViewport(isInViewport(marker, inViewportOptions))
    }

    const intervalId = setInterval(checkViewport, interval)

    return () => {
      clearInterval(intervalId)
    }
  }, [ enabled, markerRef, interval, inViewportOptions ])

  return inViewport
}
