import { FeatureFlag } from "./SiteMetaData"
import { useFeatureFlags$ } from "./SiteMetaQueries"

export function useFeatureFlag(flag: FeatureFlag): boolean {
  const featureFlags$ = useFeatureFlags$()
  const featureFlags = featureFlags$.data || {}
  return featureFlags[flag] || false
}
