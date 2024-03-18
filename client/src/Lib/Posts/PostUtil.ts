import { format as formatDate, parseISO } from 'date-fns'

import { formatSlug } from '../FilenameUtils'

export function formatPostSlug({ date, title }: { date?: string; title?: string }): string {
  date = formatDate(parseISO(date || ''), 'yyyyMMdd')
  return formatSlug(`${date} ${title || ''}`)
}

export type PostUrlParams = {
  postId: string
  tagId?: string | null
  galleryId?: string | null
}

export const getPostUrl = ({ postId, tagId, galleryId }: PostUrlParams) => {
  if (tagId) {
    return `/tag/${tagId}/${postId}`
  } else if (galleryId) {
    return `/gallery/${galleryId}/${postId}`
  } else {
    return `/post/${postId}`
  }
}
