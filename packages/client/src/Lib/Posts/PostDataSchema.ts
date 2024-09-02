import z from "zod"

import { ImageDataSchema } from "../Images/ImageDataSchema.ts"
import { PagedResMetaDataSchema } from "../../Api/Schemas/PagedResMetaDataSchema.ts"
import { TagDataSchema } from "../Tags/TagDataSchema.ts"

export const PostDataSchema = z.object({
  id: z.string().uuid(),
  date: z.string().datetime(),
  position: z.number().int(),
  title: z.string(),
  slug: z.string(),
  description: z.string().trim().default("").nullable(),
  tags: z.array(TagDataSchema).default([]),
  images: z.array(ImageDataSchema).default([]),
  released: z.boolean().default(false),
  scheduled: z.string().datetime().nullable(),
})

export const PostDataResSchema = z
  .object({
    post: PostDataSchema,
  })
  .transform((res) => res.post)

export const PagedPostDataResSchema = PagedResMetaDataSchema.merge(
  z.object({
    posts: z.array(PostDataSchema),
  }),
)

export type PagedPostData = z.infer<typeof PagedPostDataResSchema>
