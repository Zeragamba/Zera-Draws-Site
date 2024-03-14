import {
  useInfiniteQuery,
  UseInfiniteQueryResult,
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from '@tanstack/react-query'

import { pagedQueryOptions } from './QueryUtils'
import { postApiClient } from '../Api'
import { PagedPostData } from '../Api/Schemas'
import { EditableImage, EditablePost, ImageChangeRecord, PostData } from '../Lib'

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
    mutationFn: (params) => postApiClient.createPost(params),
  })
}

export const useDeletePost$ = (): UseMutationResult<PostData, unknown, {
  postId: PostData['id']
}> => {
  return useMutation({
    mutationFn: (params) => postApiClient.deletePost(params),
  })
}

export const useUpdatePost$ = (): UseMutationResult<PostData, unknown, {
  postId: PostData['id']
  post?: Partial<EditablePost>
  changes?: ImageChangeRecord[]
  onUploadProgress: (progress: number) => void
}> => {
  return useMutation({
    mutationFn: (params) => postApiClient.updatePost(params),
  })
}

export const useAllPosts$ = (): UseInfiniteQueryResult<PostData[]> => {
  return useInfiniteQuery({
    ...pagedPostDataQueryOptions,
    queryKey: [ 'posts', 'all' ],
    queryFn: ({ pageParam }) => postApiClient.fetchPosts({ page: pageParam }),
  })
}

export const useRecentPosts$ = (): UseInfiniteQueryResult<PostData[]> => {
  return useInfiniteQuery({
    ...pagedPostDataQueryOptions,
    queryKey: [ 'posts', 'recent' ],
    queryFn: ({ pageParam }) => postApiClient.fetchRecentPosts({ page: pageParam }),
  })
}

export const useLatestPost$ = (): UseQueryResult<PostData> => {
  return useQuery({
    queryKey: [ 'posts', 'latest' ],
    queryFn: () => postApiClient.fetchLatestPost(),
  })
}

export const useFirstPost$ = (): UseQueryResult<PostData> => {
  return useQuery({
    queryKey: [ 'posts', 'first' ],
    queryFn: () => postApiClient.fetchFirstPost(),
  })
}

export const usePost$ = (params: PostParams): UseQueryResult<PostData> => {
  return useQuery({
    queryKey: [ 'posts', params ],
    queryFn: () => postApiClient.fetchPost(params),
  })
}

export const useNextPost$ = (params: PostParams): UseQueryResult<PostData> => {
  return useQuery({
    queryKey: [ 'posts', params, 'next' ],
    queryFn: () => postApiClient.fetchNextPost(params),
  })
}

export const usePrevPost$ = (params: PostParams): UseQueryResult<PostData> => {
  return useQuery({
    queryKey: [ 'posts', params, 'prev' ],
    queryFn: () => postApiClient.fetchPrevPost(params),
  })
}
