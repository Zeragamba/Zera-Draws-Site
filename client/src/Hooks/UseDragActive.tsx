import { RefObject, useEffect, useState } from 'react'

export function useDragActive(elementRef: RefObject<Element>): boolean {
  const [ dragActive, setDragActive ] = useState<boolean>(false)

  useEffect(() => {
    console.log(elementRef.current)
    const element = elementRef.current
    if (!element) return

    const dragStart = () => setDragActive(true)
    const startEvents = [ 'dragstart', 'dragenter' ]
    startEvents.forEach(event => element.addEventListener(event, dragStart))

    const dragEnd = () => setDragActive(false)
    const endEvents = [ 'dragstop', 'dragleave', 'drop' ]
    endEvents.forEach(event => element.addEventListener(event, dragEnd))

    return () => {
      startEvents.forEach(event => element.removeEventListener(event, dragStart))
      endEvents.forEach(event => element.removeEventListener(event, dragEnd))
    }
  }, [ elementRef ])

  console.log('dragActive', elementRef.current, dragActive)
  return dragActive
}
