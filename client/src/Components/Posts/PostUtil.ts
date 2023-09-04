import { format as formatDate, parseISO } from 'date-fns'

import { formatSlug } from '../../Lib/FilenameUtils'

export function formatPostSlug({ date, title }: { date?: string; title?: string }): string {
  date = formatDate(parseISO(date || ''), 'yyyyMMdd')
  return formatSlug(`${date} ${title || ''}`)
}
