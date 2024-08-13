export function createFile(contents: string, type = "text/plain"): Blob {
  return new Blob([contents], { type })
}

export function downloadFile(file: Blob, filename: string) {
  const url = URL.createObjectURL(file)
  const link = document.createElement("a")
  link.download = filename
  link.href = url
  link.click()
  link.remove()
}
