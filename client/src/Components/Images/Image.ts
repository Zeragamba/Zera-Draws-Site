export interface Image {
  id: string
  order: number
  filename: string
  height: number
  width: number
  mime_type: string
  ext: string

  srcs: ImageSizes
  file?: File
}

type ImageSizes =
  & { full: string }
  & { [size: string]: string | undefined }

type EditableFields =
  | 'filename'
  | 'order'
  | 'file'

export type EditableImage = Pick<Image, EditableFields>
