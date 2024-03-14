import z from 'zod'


export const PagedResMetaDataSchema = z.object({
  count: z.number(),
  page: z.number(),
  total_pages: z.number(),
})

export type PagedResMetaData = z.infer<typeof PagedResMetaDataSchema>

export type PagedModelResData<Field extends string, Model> =
  & PagedResMetaData
  & { [field in Field]: Model[] }
