import { PostImageCtrl, usePostImageCtrl } from './UsePostImageNavCtrl'
import { PostNavCtrl, usePostNavCtrl } from './UsePostNavCtrl'

export type UseViewPostCtrl =
  & PostNavCtrl
  & PostImageCtrl

export const useViewPostCtrl = (): UseViewPostCtrl => {
  const postNavCtrl = usePostNavCtrl()
  const PostImageCtrl = usePostImageCtrl()

  return {
    ...postNavCtrl,
    ...PostImageCtrl,
  }
}
