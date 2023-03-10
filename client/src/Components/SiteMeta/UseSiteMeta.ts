import { useQuery, UseQueryResult } from '@tanstack/react-query'

import { ContentMeta, SiteMetaData, SocialsMeta } from './SiteMetaData'
import { SiteMetaQueries } from './SiteMetaQueries'

export const useSiteMeta = (group: string): UseQueryResult<SiteMetaData> => {
  return useQuery({
    ...SiteMetaQueries.get(group),
  })
}

export const useSocials = (): SocialsMeta => {
  return (useSiteMeta('socials').data || {})
}

export const useMetaContent = (): ContentMeta => {
  return (useSiteMeta('content').data || {})
}
