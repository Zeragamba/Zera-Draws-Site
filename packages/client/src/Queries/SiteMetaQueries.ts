import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { queryKeys } from "./QueryKeys"
import { siteMetaApi } from "../Api"
import { ContentMeta, FeatureFlags, SocialsMeta } from "../Models"

export const useFeatureFlags$ = () => {
  return useQuery({
    ...queryKeys.siteMeta.features,
    queryFn: () => siteMetaApi.fetchFeatureFlags(),
  })
}

export const useUpdateFeatureFlags$ = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (params: FeatureFlags) =>
      siteMetaApi.updateFeatureFlags(params),
    onSuccess: async () => {
      await queryClient.invalidateQueries(queryKeys.siteMeta.features)
    },
  })
}

export const useCustomContent$ = () => {
  return useQuery({
    ...queryKeys.siteMeta.content,
    queryFn: () => siteMetaApi.fetchCustomContent(),
  })
}

export const useUpdateCustomContent$ = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (params: ContentMeta) =>
      siteMetaApi.updateCustomContent(params),
    onSuccess: async () => {
      await queryClient.invalidateQueries(queryKeys.siteMeta.content)
    },
  })
}

export const useSocialPlatforms$ = () => {
  return useQuery({
    ...queryKeys.siteMeta.socials,
    queryFn: () => siteMetaApi.fetchSocialPlatforms(),
  })
}

export const useUpdateSocialPlatforms$ = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (params: SocialsMeta) => siteMetaApi.updateSocials(params),
    onSuccess: async () => {
      await queryClient.invalidateQueries(queryKeys.siteMeta.socials)
    },
  })
}
