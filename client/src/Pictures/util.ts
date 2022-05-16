export const buildSlug = (date: string, title: string): string => {
  title = title
    .toLowerCase()
    .replace(/\W+/g, '-')

  return `${date}-${title}`
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

  console.log(filenameMatch.groups)
  let { title, date } = filenameMatch.groups

  if (title.match(/^\d{4}-\d{2}-\d{2}$/)) {
    date = title
    title = 'Untitled'
  }

  return { date, title }
}
