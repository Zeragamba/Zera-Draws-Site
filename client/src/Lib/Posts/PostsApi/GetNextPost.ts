import { useQuery, useQueryClient, UseQueryResult } from '@tanstack/react-query'

import { cachePostData, getPostUrl } from './GetPost'
import { postsQueryKeys } from './PostsQueryKeys'
import { usePageContext } from '../../../Theme/./DefaultTheme/Layout/PageContext'
import { ModelResponse, ServerClient } from '../../ServerApi'
import { PostData } from '../PostData'

type GetNextPostParams = {
  postId: PostData['id']
  galleryId?: string
  tagId?: string
}

type GetNextPostRes = ModelResponse<'post', PostData>

export const getNextPost = ({ postId, tagId, galleryId }: GetNextPostParams): Promise<PostData> => {
  return ServerClient.get<GetNextPostRes>(getPostUrl({ postId, tagId: tagId, galleryId: galleryId }) + '/next')
    .then(res => res.post)
}

export const useNextPost = (curPostId: PostData['id' | 'slug']): UseQueryResult<PostData> => {
  const queryClient = useQueryClient()
  const { tagId, galleryId } = usePageContext()

  return useQuery({
    ...postsQueryKeys.get(curPostId)._ctx.next({
      gallery: galleryId,
      tag: tagId,
    }),
    queryFn: async () => {
      const post = await getNextPost({
        postId: curPostId,
        galleryId: galleryId,
        tagId: tagId,
      })

      cachePostData(queryClient, post)
      return post
    },
  })
}
