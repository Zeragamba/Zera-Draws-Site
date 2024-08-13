export function formatSlug(str: string): string {
  return str
    .toLowerCase()
    .replace(/[\W_]+/g, " ")
    .replace(/\s+/g, "-")
}

export function formatTitle(str: string): string {
  return str.replace(/_+/g, " ")
}

type FilenameMeta = {
  date: string
  title: string
}

export const parseFilename = (filename: string): FilenameMeta => {
  const filenameMatch = filename.match(
    /^((?<date>\d{4}-\d{2}-\d{2}) - )?(?<title>.+?)(?<ext>\..+)?$/,
  )

  if (!filenameMatch || !filenameMatch.groups) {
    throw Error("Unable to parse filename") // This should not happen...
  }

  let { title, date } = filenameMatch.groups
  date ||= new Date().toISOString()

  if (title.match(/^\d{4}-\d{2}-\d{2}$/)) {
    date = title
    title = "Untitled"
  }

  return { date, title }
}
