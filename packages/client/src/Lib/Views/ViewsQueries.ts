import { useQuery, UseQueryResult } from "@tanstack/react-query"

import { postViewsApi } from "../../Api"
import { PostData } from "../../Models/PostData"
import { ViewsData } from "../../Models/ViewsData"
import { queryKeys } from "../../Queries/QueryKeys"

export function usePostViews$(
  postId: PostData["id"],
): UseQueryResult<ViewsData> {
  return useQuery({
    ...queryKeys.posts.forPost({ postId })._ctx.views,
    queryFn: () => postViewsApi.fetchViews({ postId }),
  })
}
