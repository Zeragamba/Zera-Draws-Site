import z from 'zod'

import { imageDataSchema } from './Image'
import { tagDataSchema } from './Tag'


export const postDataSchema = z.object({
  id: z.string().uuid(),
  date: z.string().datetime(),
  position: z.number().int(),
  title: z.string(),
  slug: z.string(),
  description: z.string().trim().default(''),
  tags: z.array(tagDataSchema).default([]),
  images: z.array(imageDataSchema).default([]),
  released: z.boolean().default(false),
  scheduled: z.string().datetime().nullable(),
})
