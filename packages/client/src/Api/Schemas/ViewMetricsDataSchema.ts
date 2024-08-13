import z from "zod"

export const ViewMetricsDataSchema = z.object({
  id: z.string().uuid(),
  slug: z.string(),
  title: z.string(),
  views: z.number(),
  unique_views: z.number(),
})

export const ViewMetricsResSchema = z.array(ViewMetricsDataSchema)
