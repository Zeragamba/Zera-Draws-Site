import { format as formatDate } from 'date-fns'

export const noOp = (): void => {
  /* noop */
}

export function formatSlug(str: string): string {
  return str
    .toLowerCase()
    .replace(/\W+/g, ' ')
    .replace(/\s+/g, '-');
}

type FilenameMeta = {
  date: string
  title: string
}

export const parseFilename = (filename: string): FilenameMeta => {
  const filenameMatch = filename
    .match(/^((?<date>\d{4}-\d{2}-\d{2}) - )?(?<title>.+?)(?<ext>\..+)?$/)

  if (!filenameMatch || !filenameMatch.groups) {
    throw Error('Unable to parse filename') // This should not happen...
  }

  let { title, date } = filenameMatch.groups
  date ||= formatDate(new Date(), 'yyyy-MM-dd')

  if (title.match(/^\d{4}-\d{2}-\d{2}$/)) {
    date = title
    title = 'Untitled'
  }

  return { date, title }
}
