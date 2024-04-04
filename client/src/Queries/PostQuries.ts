import {
  QueryClient,
  useInfiniteQuery,
  UseInfiniteQueryResult,
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
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

function updateCache(queryClient: QueryClient, post: PostData) {
  queryClient.removeQueries({
    queryKey: queryKeys.posts.forPost({ postId: post.id }).queryKey,
  })

  queryClient.removeQueries({
    queryKey: queryKeys.posts.forPost({ postId: post.slug }).queryKey,
  })

  queryClient.setQueryData(
    queryKeys.posts.forPost({ postId: post.id })._ctx.data.queryKey,
    post,
  )

  queryClient.setQueryData(
    queryKeys.posts.forPost({ postId: post.slug })._ctx.data.queryKey,
    post,
  )
}

export const useCreatePost$ = (): UseMutationResult<PostData, unknown, {
  post: EditablePost
  images: EditableImage[]
  onUploadProgress: (progress: number) => void
}> => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (params) => postsApi.createPost(params),
    onSuccess: (post) => updateCache(queryClient, post),
  })
}

export const useDeletePost$ = (): UseMutationResult<PostData, unknown, {
  postId: PostData['id']
}> => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (params) => postsApi.deletePost(params),
    onSuccess: (post) => {
      queryClient.removeQueries({
        queryKey: queryKeys.posts.all.queryKey,
      })

      queryClient.removeQueries({
        queryKey: queryKeys.posts.forPost({ postId: post.id }).queryKey,
      })

      queryClient.removeQueries({
        queryKey: queryKeys.posts.forPost({ postId: post.slug }).queryKey,
      })
    },
  })
}

export const useUpdatePost$ = (): UseMutationResult<PostData, unknown, {
  postId: PostData['id']
  post?: Partial<EditablePost>
  changes?: ImageChangeRecord[]
  onUploadProgress?: (progress: number) => void
}> => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (params) => postsApi.updatePost(params),
    onSuccess: (post) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.posts.all.queryKey })
      updateCache(queryClient, post)
    },
  })
}

export const useAllPosts$ = (): UseInfiniteQueryResult<PostData[]> => {
  const queryClient = useQueryClient()

  return useInfiniteQuery({
    ...pagedPostDataQueryOptions,
    ...queryKeys.posts.all,
    queryFn: async ({ pageParam }) => {
      const page = await postsApi.fetchPosts({ page: pageParam })
      page.posts.forEach((post) => updateCache(queryClient, post))
      return page
    },
  })
}

export const useRecentPosts$ = (): UseInfiniteQueryResult<PostData[]> => {
  const queryClient = useQueryClient()

  return useInfiniteQuery({
    ...pagedPostDataQueryOptions,
    ...queryKeys.posts.recent,
    queryFn: async ({ pageParam }) => {
      const page = await postsApi.fetchRecentPosts({ page: pageParam })
      page.posts.forEach((post) => updateCache(queryClient, post))
      return page
    },
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
  const queryClient = useQueryClient()

  return useInfiniteQuery({
    ...queryKeys.posts.inGallery(params)._ctx.data,
    ...pagedQueryOptions,
    queryFn: async ({ pageParam }) => {
      const page = await postsApi.fetchGalleryPosts({ ...params, page: pageParam })
      page.posts.forEach((post) => updateCache(queryClient, post))
      return page
    },
    select: (data) => data.pages.map(page => page.posts).flat(),
  })
}

export const useTaggedPosts$ = (params: {
  tagId: TagData['id']
}): UseInfiniteQueryResult<PostData[]> => {
  const queryClient = useQueryClient()

  return useInfiniteQuery({
    ...queryKeys.posts.withTag(params)._ctx.data,
    ...pagedQueryOptions,
    queryFn: async ({ pageParam }) => {
      const page = await postsApi.fetchTaggedPosts({ ...params, page: pageParam })
      page.posts.forEach((post) => updateCache(queryClient, post))
      return page
    },
    select: (data) => data.pages.map(page => page.posts).flat(),
  })
}
