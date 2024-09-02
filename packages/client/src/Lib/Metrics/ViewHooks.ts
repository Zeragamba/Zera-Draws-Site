import * as uuid from "uuid"

import { noop } from "../Noop"
import { PostData } from "../Posts"
import { postViewsApi } from "./PostViewsApi"

const VIEWER_ID_KEY = "viewerId"
const SESSION_VIEWS_KEY = (postId: string) => `viewed.${postId}`

function getViewerId(): string {
  let viewerId = localStorage.getItem(VIEWER_ID_KEY)

  if (!viewerId) {
    viewerId = uuid.v4()
    localStorage.setItem(VIEWER_ID_KEY, viewerId)
  }

  return viewerId
}

async function addView(postId: PostData["id"]): Promise<void> {
  const sessionKey = SESSION_VIEWS_KEY(postId)
  const viewerId = getViewerId()

  if (sessionStorage.getItem(sessionKey)) return
  sessionStorage.setItem(sessionKey, "true")

  await postViewsApi.addView({ postId, viewerId })
}

export type UseRecordViewReturn = (postId: PostData["id"]) => void

export function useRecordView(): UseRecordViewReturn {
  return (postId) => {
    addView(postId).catch(noop)
  }
}
