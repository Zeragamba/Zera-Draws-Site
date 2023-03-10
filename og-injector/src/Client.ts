import fsPromises from 'node:fs/promises'
import path from 'node:path'
import { CLIENT_DIR } from '../config'
import { ClientManifest } from './ClientManifest'

const readClientFile = async (filename: string): Promise<string> => {
  const indexBuffer = await fsPromises.readFile(path.join(CLIENT_DIR, filename))
  return indexBuffer.toString()
}

export const getAppManifest = async (): Promise<ClientManifest> => {
  const manifest = JSON.parse(await readClientFile('manifest.json'))
  console.log(`Loaded manifest: ${manifest}`)
  return manifest
}

export const getIndexHtml = async (): Promise<string> => {
  const indexHtml = await readClientFile('index.html')
  console.log(`Loaded indexHtml: ${indexHtml}`)
  return indexHtml
}
