export function formatError(error: unknown): string {
  if (typeof error !== 'object' || error === null) {
    return 'Null'
  }

  if (error instanceof Error) {
    return error.message
  }

  if ('toString' in error && typeof error.toString === 'function') {
    return error.toString()
  }

  return String(error)
}
