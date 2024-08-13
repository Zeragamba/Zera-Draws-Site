export type ImageFormState =
  { image: File | undefined }
  & TextFields

export type TextFields = {
  title: FormField
  date: FormField
  slug: FormField
  description: FormField
}

type FormField = {
  value: string
  error?: string
  dirty: boolean
}
