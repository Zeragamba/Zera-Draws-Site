export interface Image {
  id: string
  order: number
  filename: string
  srcs: ImageSizes
  height: number
  width: number
  mime_type: string
  ext: string
}

type ImageSizes =
  & { full: string }
  & { [size: string]: string | undefined }

type EditableFields =
  | 'filename'

export type EditableImage = Pick<Image, EditableFields>
