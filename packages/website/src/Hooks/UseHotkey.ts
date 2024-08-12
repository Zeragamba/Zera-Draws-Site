import { useEffect, useRef } from 'react'

import { noOp } from '../Lib/Noop'

export const useHotkey = (hotkey: string, action: () => void): void => {
  const actionRef = useRef<() => void>(noOp)

  useEffect(() => {
    actionRef.current = action
  }, [ action ])

  useEffect(() => {
    const onkeydown = (event: KeyboardEvent) => {
      if (event.key !== hotkey) return
      event.preventDefault()
      actionRef.current()
    }

    document.addEventListener('keydown', onkeydown)
    return () => document.removeEventListener('keydown', onkeydown)
  }, [ hotkey ])
}
