import { useEffect, useState } from 'react'
import { sort } from 'fast-sort'

export type SortableData = { id: string; position: number }
export const byPosition = (data: SortableData) => data.position

type UseSortableResult<Data extends SortableData> = [ order: Data[], move: MoveAction ]

type MoveAction = (srcId: SortableData['id'], targetPos: number) => void

export function useSortable<Data extends SortableData>(items: Data[]): UseSortableResult<Data> {
  const [ localItems, setLocalItems ] = useState<Data[]>(items)
  useEffect(() => setLocalItems(items), [ items ])

  const move: MoveAction = (srcPostId, targetPos) => {
    setLocalItems(reorderItems(localItems, srcPostId, targetPos))
  }

  return [ sort(localItems).by({ asc: byPosition }), move ]
}

export function reorderItems<T extends SortableData>(items: T[], targetId: string, targetPosition: number): T[] {
  const targetItem = items.find(item => item.id === targetId)
  if (!targetItem) throw new Error('item not found')

  const startPosition: number = targetItem.position
  if (startPosition === targetPosition) return items

  const minPos = Math.min(startPosition, targetPosition)
  const maxPos = Math.max(startPosition, targetPosition)

  return items.map(post => {
    if (post.id === targetId) {
      return { ...post, position: targetPosition }
    } else if (post.position >= minPos && post.position <= maxPos) {
      if (targetPosition > startPosition) {
        return { ...post, position: post.position - 1 }
      } else {
        return { ...post, position: post.position + 1 }
      }
    } else {
      return post
    }
  })
}
