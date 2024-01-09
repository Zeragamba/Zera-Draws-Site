import { useQuery, UseQueryResult } from '@tanstack/react-query'

import { ContentMeta, FeatureFlag, FeatureFlags, MetaDataGroup, SiteMetaData, SocialsMeta } from './SiteMetaData'
import { SiteMetaQueries } from './SiteMetaQueries'

export const useSiteMeta = (group: string): UseQueryResult<SiteMetaData> => {
  return useQuery({
    ...SiteMetaQueries.get(group),
  })
}

export const useFeatureFlags = (): FeatureFlags => {
  return (useSiteMeta(MetaDataGroup.Features).data || {})
}

export const useFeatureFlag = (flag: FeatureFlag): boolean => {
  return useFeatureFlags()[flag] === 'true'
}

export const useSocials = (): SocialsMeta => {
  return (useSiteMeta(MetaDataGroup.Socials).data || {})
}

export const useMetaContent = (): ContentMeta => {
  return (useSiteMeta(MetaDataGroup.Content).data || {})
}
