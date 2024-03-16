import z from 'zod'

export const postViewsDataSchema = z.object({
  total: z.number(),
  unique: z.number(),
})

export const postViewsResSchema = z.object({
  views: postViewsDataSchema,
})
