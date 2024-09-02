import { addDays, setHours, setMinutes } from "date-fns"

import { EditableImage, ImageData } from "./ImageData"
import { TagData } from "./TagData"
import { ImageChangeRecord } from "../Lib/Images"

export interface PostData {
  id: string
  date: string
  position: number
  title: string
  slug: string
  description: null | string
  tags: TagData[]
  images: ImageData[]
  released: boolean
  scheduled: string | null
}

export enum EditablePostFields {
  date = "date",
  position = "position",
  title = "title",
  slug = "slug",
  description = "description",
  tags = "tags",
  released = "released",
  scheduled = "scheduled",
}

export type EditablePost = Pick<PostData, EditablePostFields>

export function createPostData(): PostData {
  let scheduledDate = new Date()

  if (scheduledDate.getHours() >= 8) {
    scheduledDate = addDays(scheduledDate, 1)
  }

  scheduledDate = setHours(scheduledDate, 8)
  scheduledDate = setMinutes(scheduledDate, 0)

  return {
    id: "",
    title: "",
    date: new Date().toISOString(),
    slug: "",
    position: 0,
    tags: [],
    images: [],
    released: true,
    description: "",
    scheduled: scheduledDate.toISOString(),
  }
}

type FormDataProps = {
  post?: Partial<EditablePost>
  images?: EditableImage[]
  changes?: ImageChangeRecord[]
}

export function postToFormData({
  post,
  images,
  changes,
}: FormDataProps): FormData {
  const formData = new FormData()

  if (post) {
    if (post.released) {
      post = { ...post, scheduled: null }
    }

    const editableFields: string[] = Object.values(EditablePostFields)

    Object.entries(post)
      .filter(([prop]) => editableFields.includes(prop))
      .forEach(([prop, value]) => {
        switch (prop) {
          case "tags":
            addTagsToFormData(formData, value as TagData[])
            break
          default:
            formData.set(`post[${prop}]`, String(value))
        }
      })
  }

  if (images) {
    addImagesToFormData(formData, images)
  }

  if (changes) {
    addChangesToFormData(formData, changes)
  }

  return formData
}

function addTagsToFormData(formData: FormData, tags: TagData[]) {
  if (tags.length === 0) {
    formData.append("tags", "__none__")
  } else {
    tags.forEach((tag) => {
      formData.append("tags[]", tag.id)
    })
  }
}

function addImagesToFormData(formData: FormData, images: EditableImage[]) {
  Array.from(images)
    .sort((a, b) => a.position - b.position)
    .forEach((image, index) => {
      Object.entries(image).forEach(([prop, value]) => {
        switch (prop) {
          case "file":
            formData.set(`images[${index}][file]`, value as File)
            break
          default:
            formData.set(`images[${index}][${prop}]`, String(value))
        }
      })
    })
}

function addChangesToFormData(formData: FormData, images: ImageChangeRecord[]) {
  images.forEach((image, index) => {
    Object.entries(image).forEach(([prop, value]) => {
      switch (prop) {
        case "file":
          formData.set(`changes[${index}][file]`, value as File)
          break
        default:
          formData.set(`changes[${index}][${prop}]`, String(value))
      }
    })
  })
}
