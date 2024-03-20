import { useMutation, useQuery, UseQueryResult } from '@tanstack/react-query'

import { queryKeys } from './QueryKeys'
import { tagsApi } from '../Api'
import { EditableTagData, TagData } from '../Models'

export const useAllTags$ = () => {
  return useQuery({
    ...queryKeys.tags.all,
    queryFn: () => tagsApi.fetchAllTags(),
  })
}

export const useOptionalTag$ = (params: {
  tagId?: TagData['id']
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
  tagId: TagData['id']
}): UseQueryResult<TagData> => {
  const tag$ = useOptionalTag$(params)
  if (tag$.data === null) throw new Error('Tag not found')
  return tag$ as UseQueryResult<TagData>
}

export const useCreateTag$ = () => {
  return useMutation({
    mutationFn: (params: {
      tag: EditableTagData
    }) => {
      return tagsApi.createTag(params)
    },
  })
}

export const useDeleteTag$ = () => {
  return useMutation({
    mutationFn: (params: {
      tagId: TagData['id']
    }) => {
      return tagsApi.deleteTag(params)
    },
  })
}

export const useUpdateTag$ = () => {
  return useMutation({
    mutationFn: (params: {
      tagId: TagData['id']
      tag: Partial<EditableTagData>
    }) => {
      return tagsApi.updateTag(params)
    },
  })
}

export const useDeleteEmptyTags$ = () => {
  return useMutation({
    mutationFn: () => tagsApi.deleteEmptyTags(),
  })
}

export const useMergeTags$ = () => {
  return useMutation({
    mutationFn: (params: {
      srcTagId: TagData['id']
      destTagId: TagData['id']
    }) => {
      return tagsApi.mergeTags(params)
    },
  })
}
