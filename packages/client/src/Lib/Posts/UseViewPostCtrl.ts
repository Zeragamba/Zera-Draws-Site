import { PostImageCtrl, usePostImageCtrl } from "./UsePostImageNavCtrl.ts"
import { PostNavCtrl, usePostNavCtrl } from "./UsePostNavCtrl.ts"
import { PostContextState, usePostContext, useRecordView } from "../index.ts"

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
