import { useQuery, UseQueryResult } from "@tanstack/react-query"

import { postViewsApi } from "../../Api"
import { ViewsData } from "../../Models"
import { queryKeys } from "../../Queries/QueryKeys"
import { PostData } from "../Posts"

export function usePostViews$(
  postId: PostData["id"],
): UseQueryResult<ViewsData> {
  return useQuery({
    ...queryKeys.posts.forPost({ postId })._ctx.views,
    queryFn: () => postViewsApi.fetchViews({ postId }),
  })
}
