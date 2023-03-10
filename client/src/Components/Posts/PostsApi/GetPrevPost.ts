import { useQuery, useQueryClient, UseQueryResult } from '@tanstack/react-query'

import { cachePostData, getPostUrl } from './GetPost'
import { postsQueryKeys } from './PostsQueryKeys'
import { ModelResponse, ServerClient } from '../../../Lib/ServerApi'
import { usePageContext } from '../../Layouts/PageContext'
import { PostData } from '../PostData'

type Params = {
  postId: PostData['id']
  gallery?: string
  tag?: string
}

type GetPrevPostRes = ModelResponse<'post', PostData>

export const getPrevPost = ({ postId, tag, gallery }: Params): Promise<PostData> => {
  return ServerClient.get<GetPrevPostRes>(getPostUrl({ postId, tagId: tag, galleryId: gallery }) + '/prev')
    .then(res => res.post)
}

export const usePrevPost = (curPostId: PostData['id' | 'slug']): UseQueryResult<PostData> => {
  const queryClient = useQueryClient()
  const { tagId, galleryId } = usePageContext()

  return useQuery({
    ...postsQueryKeys.get(curPostId)._ctx.prev({
      gallery: galleryId,
      tag: tagId,
    }),
    queryFn: () => getPrevPost({
      postId: curPostId,
      gallery: galleryId,
      tag: tagId,
    }),
    onSuccess: (post) => cachePostData(queryClient, post),
  })
}
