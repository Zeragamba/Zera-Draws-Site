import { useInfiniteQuery, UseInfiniteQueryResult, useQueryClient } from '@tanstack/react-query'

import { PagedModelResponse, ServerClient } from '../../../Lib/ServerApi'
import { Post } from '../Post'
import { setGetPostData } from './GetPost'
import { postsQueryKeys } from './PostsQueryKeys'


type Params = { gallery: string; page?: number }

type ResponseBody = PagedModelResponse<'posts', Post>

export const getGalleryPosts = (params: Params): Promise<ResponseBody> => {
  const { page = 0, gallery } = params
  return ServerClient.get<ResponseBody>(`/gallery/${gallery}/posts`, { params: { page } })
}

export const useGalleryPosts = ({ gallery }: Omit<Params, 'page'>): UseInfiniteQueryResult<Post[]> => {
  const queryClient = useQueryClient()

  return useInfiniteQuery<ResponseBody, unknown, Post[]>({
    queryKey: postsQueryKeys.getGalleryPosts(gallery),
    queryFn: ({ pageParam = 0 }) => {
      return getGalleryPosts({ page: pageParam, gallery })
    },
    onSuccess: (data) => {
      const posts: Post[] = data.pages.map(page => page).flat()
      posts.forEach((post) => setGetPostData(queryClient, post))
    },
    select: (data) => ({
      pages: data.pages.map(page => page.posts),
      pageParams: data.pageParams,
    }),
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total_pages - 1) {
        return lastPage.page + 1
      }
    },
    getPreviousPageParam: (lastPage) => {
      if (lastPage.page > 0) {
        return lastPage.page - 1
      }
    },
  })
}
