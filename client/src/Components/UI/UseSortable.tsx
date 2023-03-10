import { createSorter, sortArray } from 'dyna-sort'
import { useEffect, useState } from 'react'

export type SortableData = { id: string; position: number }
export const byPosition = createSorter<SortableData>((a, b) => a.position - b.position)

type UseSortableResult<Data extends SortableData> = [ order: Data[], move: MoveAction ]

type MoveAction = (srcId: SortableData['id'], targetPos: number) => void

export function useSortable<Data extends SortableData>(items: Data[]): UseSortableResult<Data> {
  const [ localItems, setLocalItems ] = useState<Data[]>(items)
  useEffect(() => setLocalItems(items), [ items ])

  const move: MoveAction = (srcPostId, targetPos) => {
    const srcOrder = localItems.find(post => post.id === srcPostId)
    if (!srcOrder) throw new Error('item not found')

    const sourcePos: number = srcOrder.position
    if (sourcePos === targetPos) return

    const minPos = Math.min(sourcePos, targetPos)
    const maxPos = Math.max(sourcePos, targetPos)

    const reordered = localItems
      .map(post => {
        if (post.id === srcPostId) {
          return { ...post, position: targetPos }
        } else if (post.position >= minPos && post.position <= maxPos) {
          if (targetPos > sourcePos) {
            return { ...post, position: post.position - 1 }
          } else {
            return { ...post, position: post.position + 1 }
          }
        } else {
          return post
        }
      })

    setLocalItems(reordered)
  }

  return [ sortArray(localItems, byPosition), move ]
}
