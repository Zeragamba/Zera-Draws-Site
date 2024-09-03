import z from "zod"
import {
  ContentFields,
  FeatureFlag,
  MetaDataSet,
  SocialPlatform,
} from "./SiteMetaData"

const stringValue = z.string().optional()
const booleanValue = stringValue.transform((value) => {
  if (!value) return false
  return ["t", "true"].includes(value.toLowerCase())
})

export const FeatureFlagsSchema: z.ZodType<MetaDataSet<FeatureFlag, boolean>> =
  z.record(z.string(), booleanValue)

export const SocialsSchema: z.ZodType<MetaDataSet<SocialPlatform>> = z.record(
  z.string(),
  stringValue,
)

export const ContentSchema: z.ZodType<MetaDataSet<ContentFields>> = z.record(
  z.string(),
  stringValue,
)
