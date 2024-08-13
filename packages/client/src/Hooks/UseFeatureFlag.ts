import { FeatureFlag } from "../Models"
import { useFeatureFlags$ } from "../Queries"

export function useFeatureFlag(flag: FeatureFlag): boolean {
  const featureFlags$ = useFeatureFlags$()
  const featureFlags = featureFlags$.data || {}
  return featureFlags[flag] || false
}
