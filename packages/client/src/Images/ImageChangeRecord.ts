export type ImageChangeRecord =
  | AddImageChangeRecord
  | EditImageChangeRecord
  | RemoveImageChangeRecord

export type AddImageChangeRecord = {
  action: "add"
  id: string
  filename: string
  position?: number
  file: File
}

export type EditImageChangeRecord = {
  action: "edit"
  id: string
  filename?: string
  position?: number
  file?: File
}

export type RemoveImageChangeRecord = {
  action: "remove"
  id: string
}
