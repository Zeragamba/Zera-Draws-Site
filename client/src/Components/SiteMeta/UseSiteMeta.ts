import { useQuery, UseQueryResult } from '@tanstack/react-query'

import { ContentMeta, FeatureFlags, MetaDataGroup, SiteMetaData, SocialsMeta } from './SiteMetaData'
import { SiteMetaQueries } from './SiteMetaQueries'

export const useSiteMeta = (group: string): UseQueryResult<SiteMetaData> => {
  return useQuery({
    ...SiteMetaQueries.get(group),
  })
}

export const useFeatureFlags = (): FeatureFlags => {
  return (useSiteMeta(MetaDataGroup.Features).data || {})
}

export const useSocials = (): SocialsMeta => {
  return (useSiteMeta(MetaDataGroup.Socials).data || {})
}

export const useMetaContent = (): ContentMeta => {
  return (useSiteMeta(MetaDataGroup.Content).data || {})
}
