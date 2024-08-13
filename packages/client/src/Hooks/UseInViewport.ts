import { RefCallback, useCallback, useEffect, useState } from "react"

type InViewportHook = [ref: RefCallback<Element>, inViewport: boolean]

export function useInViewport(): InViewportHook {
  const [inViewport, setInViewport] = useState<boolean>(false)
  const [element, setElement] = useState<Element | null>(null)

  const elementRef = useCallback(setElement, [setElement])

  useEffect(() => {
    if (!element) return

    viewportObserver.add(element, (entry) => {
      setInViewport(entry.isIntersecting)
    })

    return () => {
      viewportObserver.remove(element)
    }
  }, [element])

  return [elementRef, inViewport]
}

type ObserverCallback = (entity: IntersectionObserverEntry) => void

class ViewportObserver {
  readonly observer: IntersectionObserver
  readonly callbacks: Map<Element, ObserverCallback>

  constructor() {
    this.observer = new IntersectionObserver(this.onChange.bind(this))
    this.callbacks = new Map<Element, ObserverCallback>()
  }

  onChange(entries: IntersectionObserverEntry[]) {
    entries.forEach((entry) => {
      const callback = this.callbacks.get(entry.target)
      if (callback) callback(entry)
    })
  }

  add(element: Element, callback: (entry: IntersectionObserverEntry) => void) {
    this.callbacks.set(element, callback)
    this.observer.observe(element)
  }

  remove(element: Element) {
    this.callbacks.delete(element)
    this.observer.unobserve(element)
  }
}

const viewportObserver = new ViewportObserver()
