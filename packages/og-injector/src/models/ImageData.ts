export interface ImageData {
  id: string
  position: number
  filename: string
  height: number
  width: number
  mime_type: string
  ext: string

  srcs: ImageSizes
}

type ImageSizes =
  & { full: string }
  & { [size: string]: string | undefined }
