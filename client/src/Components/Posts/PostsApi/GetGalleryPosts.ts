import { QueryKey } from '@tanstack/query-core/build/modern/index'
import { useInfiniteQuery, UseInfiniteQueryResult, useQueryClient } from '@tanstack/react-query'

import { cachePostData } from './GetPost'
import { PagedModelResponse, ServerClient } from '../../../Lib/ServerApi'
import { galleryQueryKeys } from '../../Gallery/GalleryQueryKeys'
import { PostData } from '../PostData'


type Params = { gallery: string; page?: number }

type ResponseBody = PagedModelResponse<'posts', PostData>

export const getGalleryPosts = (params: Params): Promise<ResponseBody> => {
  const { page = 0, gallery } = params
  return ServerClient.get<ResponseBody>(`/gallery/${gallery}/posts`, { params: { page } })
}

export const useGalleryPosts = ({ gallery }: Omit<Params, 'page'>): UseInfiniteQueryResult<PostData[]> => {
  const queryClient = useQueryClient()

  return useInfiniteQuery<ResponseBody, Error, PostData[], QueryKey, number>({
    ...galleryQueryKeys.get(gallery)._ctx.posts,
    initialPageParam: 0,
    queryFn: async ({ pageParam }) => {
      const res = await getGalleryPosts({ page: pageParam, gallery })
      res.posts.forEach((post) => cachePostData(queryClient, post))
      return res
    },
    select: (data) => data.pages.map(page => page.posts).flat(),
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
