import { format as formatDate } from 'date-fns'
import { RefObject, useEffect, useState } from 'react'

export const noOp = (): void => {
  /* noop */
}

type InViewportOptions = Partial<{
  parent: HTMLElement
  partial: boolean
  expand: number
}>

export function isInViewport(element: HTMLElement, {
  parent,
  partial = false,
  expand = 0,
}: InViewportOptions = {}): boolean {
  parent ||= document.documentElement

  const targetBox = element.getBoundingClientRect()
  const parentBox = parent.getBoundingClientRect()

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

type InViewportHookOptions = InViewportOptions & Partial<{
  interval: number
}>

export function useInViewport(markerRef: RefObject<HTMLElement | null>, options: InViewportHookOptions = {}): boolean {
  const {
    interval = 1000,
    ...inViewportOptions
  } = options

  const [ inViewport, setInViewport ] = useState<boolean>(false)

  useEffect(() => {
    const onScroll = () => {
      if (!markerRef.current) return
      const marker = markerRef.current
      setInViewport(isInViewport(marker, inViewportOptions))
    }

    const intervalId = setInterval(onScroll, interval)

    return () => {
      clearInterval(intervalId)
    }
  }, [ markerRef, interval, inViewportOptions ])

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
