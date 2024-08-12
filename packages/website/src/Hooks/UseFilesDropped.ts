import { RefObject, useEffect } from 'react'

interface DropEvent extends DragEvent {
  dataTransfer: DataTransfer
}

function isDragEvent(event: Event): event is DragEvent {
  return event instanceof DragEvent
}

function isDropEvent(event: Event): event is DropEvent {
  return isDragEvent(event) && !!event.dataTransfer
}

export function useFilesDropped(scopeRef: RefObject<Element> | undefined, callback: (files: File[]) => void): void {
  useEffect(() => {
    if (!scopeRef) return

    const dropScope = scopeRef.current
    if (!dropScope) return

    const onDragOver = (event: Event) => {
      if (!isDragEvent(event)) return

      // Prevent default behavior (Prevent file from being opened)
      event.preventDefault()
    }

    const onDrop = (event: Event) => {
      if (!isDropEvent(event)) return

      // Prevent default behavior (Prevent file from being opened)
      event.preventDefault()

      callback(processDroppedFiles(event))
    }

    dropScope.addEventListener('drop', onDrop)
    dropScope.addEventListener('dragover', onDragOver)

    return () => {
      dropScope.removeEventListener('drop', onDrop)
      dropScope.removeEventListener('dragover', onDragOver)
    }
  }, [ scopeRef, callback ])
}

function processDroppedFiles(event: DropEvent): File[] {
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

  return files
}
