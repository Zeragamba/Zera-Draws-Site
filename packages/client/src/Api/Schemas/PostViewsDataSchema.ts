import z from "zod"

export const PostViewsDataSchema = z.object({
  total: z.number(),
  unique: z.number(),
})

export const PostViewsResSchema = z
  .object({
    views: PostViewsDataSchema,
  })
  .transform((res) => res.views)
