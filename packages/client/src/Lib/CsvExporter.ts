export function toCsv<Data extends object>(data: Data[]): string {
  if (data.length === 0) return ''

  const rows: string[] = []
  const headers = Object.keys(data[0]) as (keyof Data)[]

  rows.push(toRow(headers))

  data
    .map((item) => headers.map((header) => item[header]))
    .map((values) => toRow(values))
    .forEach((row) => rows.push(row))

  return rows.join('\n')
}


function toRow(values: unknown[]): string {
  return values
    .map(value => String(value))
    .map(value => sanitizeValue(value))
    .join(',')
}

function sanitizeValue(value: string): string {
  if (!value.includes(',')) return value
  value = value.replaceAll('"', '""')
  return `"${value}"`
}
