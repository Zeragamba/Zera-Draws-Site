import fsPromises from 'node:fs/promises'
import path from 'node:path'
import { CLIENT_DIR } from '../config'
import { ClientManifest } from './ClientManifest'
import { logger } from './Logger'

const readClientFile = async (filename: string): Promise<string> => {
  const indexBuffer = await fsPromises.readFile(path.join(CLIENT_DIR, filename))
  return indexBuffer.toString()
}

export const getAppManifest = async (): Promise<ClientManifest> => {
  const manifest = JSON.parse(await readClientFile('manifest.json'))
  logger.info(`Loaded manifest: ${JSON.stringify(manifest)}`)
  return manifest
}

export const getIndexHtml = async (): Promise<string> => {
  logger.info(`Loading index file`)
  const indexHtml = await readClientFile('index.html')
  logger.info(`Loaded indexHtml: ${indexHtml}`)
  return indexHtml
}
