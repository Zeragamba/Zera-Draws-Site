import { useMutation, useQuery } from '@tanstack/react-query'

import { queryKeys } from './QueryKeys'
import { tagsApi } from '../Api/Endpoints/TagsApi'
import { EditableTagData, TagData } from '../Lib'

export const useAllTags$ = () => {
  return useQuery({
    ...queryKeys.tags.all,
    queryFn: () => tagsApi.fetchAllTags(),
  })
}

export const useTags$ = (params: {
  tagId: TagData['id']
}) => {
  return useQuery({
    ...queryKeys.tags.forTag(params)._ctx.data,
    queryFn: () => tagsApi.fetchTag(params),
  })
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
