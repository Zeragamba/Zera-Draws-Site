import {
  useInfiniteQuery,
  UseInfiniteQueryResult,
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from '@tanstack/react-query'

import { queryKeys } from './QueryKeys'
import { pagedQueryOptions } from './QueryUtils'
import { postsApi } from '../Api'
import { PagedPostData } from '../Api/Schemas'
import { ImageChangeRecord } from '../Images'
import { EditableImage, EditablePost, GalleryData, PostData, TagData } from '../Models'

type PostParams = { postId: string; galleryId?: string; tagId?: string }

export const pagedPostDataQueryOptions = {
  ...pagedQueryOptions,
  select: (data: { pages: PagedPostData[] }) => data.pages.map(page => page.posts).flat(),
}

export const useCreatePost$ = (): UseMutationResult<PostData, unknown, {
  post: EditablePost
  images: EditableImage[]
  onUploadProgress: (progress: number) => void
}> => {
  return useMutation({
    mutationFn: (params) => postsApi.createPost(params),
  })
}

export const useDeletePost$ = (): UseMutationResult<PostData, unknown, {
  postId: PostData['id']
}> => {
  return useMutation({
    mutationFn: (params) => postsApi.deletePost(params),
  })
}

export const useUpdatePost$ = (): UseMutationResult<PostData, unknown, {
  postId: PostData['id']
  post?: Partial<EditablePost>
  changes?: ImageChangeRecord[]
  onUploadProgress?: (progress: number) => void
}> => {
  return useMutation({
    mutationFn: (params) => postsApi.updatePost(params),
  })
}

export const useAllPosts$ = (): UseInfiniteQueryResult<PostData[]> => {
  return useInfiniteQuery({
    ...pagedPostDataQueryOptions,
    ...queryKeys.posts.all,
    queryFn: ({ pageParam }) => postsApi.fetchPosts({ page: pageParam }),
  })
}

export const useRecentPosts$ = (): UseInfiniteQueryResult<PostData[]> => {
  return useInfiniteQuery({
    ...pagedPostDataQueryOptions,
    ...queryKeys.posts.recent,
    queryFn: ({ pageParam }) => postsApi.fetchRecentPosts({ page: pageParam }),
  })
}

export const useLatestPost$ = (): UseQueryResult<PostData> => {
  return useQuery({
    ...queryKeys.posts.latest,
    queryFn: () => postsApi.fetchLatestPost(),
  })
}

export const useFirstPost$ = (): UseQueryResult<PostData> => {
  return useQuery({
    ...queryKeys.posts.first,
    queryFn: () => postsApi.fetchFirstPost(),
  })
}

export const usePost$ = (params: PostParams): UseQueryResult<PostData> => {
  return useQuery({
    ...queryKeys.posts.forPost(params)._ctx.data,
    queryFn: () => postsApi.fetchPost(params),
  })
}

export const useNextPost$ = (params: PostParams): UseQueryResult<PostData> => {
  return useQuery({
    ...queryKeys.posts.forPost(params)._ctx.next,
    queryFn: () => postsApi.fetchNextPost(params),
  })
}

export const usePrevPost$ = (params: PostParams): UseQueryResult<PostData> => {
  return useQuery({
    ...queryKeys.posts.forPost(params)._ctx.prev,
    queryFn: () => postsApi.fetchPrevPost(params),
  })
}

export const useGalleryPosts$ = (params: {
  galleryId: GalleryData['id']
}): UseInfiniteQueryResult<PostData[]> => {
  return useInfiniteQuery({
    ...queryKeys.posts.inGallery(params)._ctx.data,
    queryFn: ({ pageParam }) => postsApi.fetchGalleryPosts({...params, page: pageParam }),
    select: (data) => data.pages.map(page => page.posts).flat(),
    ...pagedQueryOptions,
  })
}

export const useTaggedPosts$ = (params: {
  tagId: TagData['id']
}): UseInfiniteQueryResult<PostData[]> => {
  return useInfiniteQuery({
    ...queryKeys.posts.withTag(params)._ctx.data,
    queryFn: ({ pageParam }) => postsApi.fetchTaggedPosts({...params, page: pageParam }),
    select: (data) => data.pages.map(page => page.posts).flat(),
    ...pagedQueryOptions,
  })
}
