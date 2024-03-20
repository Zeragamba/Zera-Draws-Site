import z from 'zod'

import { ContentFields, FeatureFlag, MetaDataSet, SocialPlatform } from '../../Lib'

const stringValue = z.string().optional()
const booleanValue = stringValue.transform((value) => value === 'true')

export const FeatureFlagsSchema: z.ZodType<MetaDataSet<FeatureFlag, boolean>> = z.record(booleanValue)
export const SocialsSchema: z.ZodType<MetaDataSet<SocialPlatform>> = z.record(stringValue)
export const ContentSchema: z.ZodType<MetaDataSet<ContentFields>> = z.record(stringValue)
