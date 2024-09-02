import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "@tanstack/react-query"

import { queryKeys } from "../../Queries/QueryKeys"
import { EditableTagData, TagData } from "./TagData"
import { tagsApi } from "./TagsApi.ts"

function updateCache(queryClient: QueryClient, tag: TagData) {
  queryClient.removeQueries({
    queryKey: queryKeys.tags.forTag({ tagId: tag.id }).queryKey,
  })

  queryClient.removeQueries({
    queryKey: queryKeys.tags.forTag({ tagId: tag.slug }).queryKey,
  })

  queryClient.setQueryData(
    queryKeys.tags.forTag({ tagId: tag.id })._ctx.data.queryKey,
    tag,
  )

  queryClient.setQueryData(
    queryKeys.tags.forTag({ tagId: tag.slug })._ctx.data.queryKey,
    tag,
  )
}

export const useAllTags$ = () => {
  return useQuery({
    ...queryKeys.tags.all,
    queryFn: () => tagsApi.fetchAllTags(),
  })
}

export const useOptionalTag$ = (params: {
  tagId?: TagData["id"]
}): UseQueryResult<TagData | null> => {
  const { tagId = null } = params

  return useQuery({
    ...queryKeys.tags.forTag({ tagId })._ctx.data,
    enabled: !!tagId,
    queryFn: () => {
      if (!tagId) return null
      return tagsApi.fetchTag({ tagId })
    },
  })
}

export const useTag$ = (params: {
  tagId: TagData["id"]
}): UseQueryResult<TagData> => {
  const tag$ = useOptionalTag$(params)
  if (tag$.data === null) throw new Error("Tag not found")
  return tag$ as UseQueryResult<TagData>
}

export const useCreateTag$ = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (params: { tag: EditableTagData }) => tagsApi.createTag(params),
    onSuccess: (tag) => {
      queryClient.removeQueries({
        queryKey: queryKeys.tags.all.queryKey,
      })

      updateCache(queryClient, tag)
    },
  })
}

export const useDeleteTag$ = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (params: { tagId: TagData["id"] }) => tagsApi.deleteTag(params),
    onSuccess: (tag) => {
      queryClient.removeQueries({
        queryKey: queryKeys.tags.all.queryKey,
      })

      queryClient.removeQueries({
        queryKey: queryKeys.tags.forTag({ tagId: tag.id }).queryKey,
      })

      queryClient.removeQueries({
        queryKey: queryKeys.tags.forTag({ tagId: tag.slug }).queryKey,
      })
    },
  })
}

export const useUpdateTag$ = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (params: {
      tagId: TagData["id"]
      tag: Partial<EditableTagData>
    }) => tagsApi.updateTag(params),
    onSuccess: (tag) => {
      queryClient.setQueryData(queryKeys.tags.all.queryKey, (tags: TagData[]) =>
        tags.map((cachedTag) => {
          if (cachedTag.id === tag.id) return tag
          return cachedTag
        }),
      )

      updateCache(queryClient, tag)
    },
  })
}

export const useDeleteEmptyTags$ = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => tagsApi.deleteEmptyTags(),
    onSuccess: () =>
      queryClient.removeQueries({
        queryKey: queryKeys.tags.all.queryKey,
      }),
  })
}

export const useMergeTags$ = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (params: {
      srcTagId: TagData["id"]
      destTagId: TagData["id"]
    }) => tagsApi.mergeTags(params),
    onSuccess: () =>
      queryClient.removeQueries({
        queryKey: queryKeys.tags.all.queryKey,
      }),
  })
}
