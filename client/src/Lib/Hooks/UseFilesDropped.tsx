import { RefCallback, useEffect, useState } from 'react'

type HookOptions = { allowMany?: boolean; scope?: Element }
export const useFilesDropped = (callback: (files: File[]) => void, options: HookOptions = {}): RefCallback<Element> => {
  const { allowMany = true, scope } = options
  const [ dropScope, setDropScope ] = useState<Element | null>(scope || null)

  useEffect(() => {
    if (!dropScope) return

    const onDragOver = (event: Event) => {
      // Prevent default behavior (Prevent file from being opened)
      event.preventDefault()
    }

    const onDrop = (event: Event) => {
      if (!(event instanceof DragEvent)) return
      if (!event.dataTransfer) return

      // Prevent default behavior (Prevent file from being opened)
      event.preventDefault()

      const files: File[] = []

      if (event.dataTransfer.items) {
        for (const item of event.dataTransfer.items) {
          const file = item.getAsFile()
          if (file) files.push(file)
        }
      } else {
        for (const file of event.dataTransfer.files) {
          files.push(file)
        }
      }

      const images = files.filter(file => file.type.match(/^image\//))
      if (images.length === 0) return

      callback(allowMany ? images : Array.of(images[0]))
    }

    dropScope.addEventListener('drop', onDrop)
    dropScope.addEventListener('dragover', onDragOver)

    return () => {
      dropScope.removeEventListener('drop', onDrop)
      dropScope.removeEventListener('dragover', onDragOver)
    }
  }, [ dropScope, callback, options ])

  return setDropScope
}
