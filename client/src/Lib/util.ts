import { format as formatDate } from 'date-fns'
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
export function formatSlug(str: string): string {
  return str
    .toLowerCase()
    .replace(/\W+/g, ' ')
    .replace(/\s+/g, '-')
}
type FilenameMeta = {
  date: string
  title: string
}
export const parseFilename = (filename: string): FilenameMeta => {
  const filenameMatch = filename
    .match(/^((?<date>\d{4}-\d{2}-\d{2}) - )?(?<title>.+?)(?<ext>\..+)?$/)

  if (!filenameMatch || !filenameMatch.groups) {
    throw Error('Unable to parse filename') // This should not happen...
  }

  let { title, date } = filenameMatch.groups
  date ||= formatDate(new Date(), 'yyyy-MM-dd')

  if (title.match(/^\d{4}-\d{2}-\d{2}$/)) {
    date = title
    title = 'Untitled'
  }

  return { date, title }
}
