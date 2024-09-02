export interface ImageData {
  id: string
  position: number
  filename: string
  srcs: ImageSizes

  height?: number
  width?: number
  mime_type?: string
  ext?: string
  file?: File
}

type ImageSizes = { full: string } & { [size: string]: string | undefined }

type EditableFields = "filename" | "position" | "file"

export type EditableImage = Pick<ImageData, EditableFields>
