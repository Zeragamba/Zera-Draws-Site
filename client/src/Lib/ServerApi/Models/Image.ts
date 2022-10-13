export interface Image {
  id: string
  order: number
  filename: string
  srcs: {
    [size: string]: string
  }
  height: number
  width: number
  mime_type: string
  ext: string
}

type EditableFields =
  | 'filename'

export type EditableImage = Pick<Image, EditableFields>
