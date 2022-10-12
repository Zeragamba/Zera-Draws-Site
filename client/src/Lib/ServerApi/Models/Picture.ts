export interface Picture {
  id: string
  date: string
  order: number
  title: string
  slug: string
  description: string
  srcs: {
    [size: string]: string
  }
  orientation: 'portrait' | 'landscape'
  height: number
  width: number
  tags?: string[]
}

type EditableFields =
  | 'title'
  | 'date'
  | 'slug'
  | 'description'

export type EditablePicture = Pick<Picture, EditableFields>
