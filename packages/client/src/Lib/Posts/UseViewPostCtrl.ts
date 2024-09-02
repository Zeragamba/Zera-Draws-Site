import { useRecordView } from "../Metrics"
import { PostContextState } from "./PostContext"
import { usePostContext } from "./PostHooks"
import { PostImageCtrl, usePostImageCtrl } from "./UsePostImageNavCtrl"
import { PostNavCtrl, usePostNavCtrl } from "./UsePostNavCtrl"

export type UseViewPostCtrl = PostContextState & PostNavCtrl & PostImageCtrl

export const useViewPostCtrl = (): UseViewPostCtrl => {
  const postContext = usePostContext()
  const postNavCtrl = usePostNavCtrl()
  const PostImageCtrl = usePostImageCtrl()
  const recordView = useRecordView()

  recordView(postContext.post.id)

  return {
    ...postContext,
    ...postNavCtrl,
    ...PostImageCtrl,
  }
}
