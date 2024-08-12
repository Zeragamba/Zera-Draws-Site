import dotenv from 'dotenv'
import dotenvExpand from 'dotenv-expand'
import path from 'node:path'

const env = dotenv.config({ path: '../.env' })
dotenvExpand.expand(env)

export const NODE_ENV = process.env.NODE_ENV || 'development'

export const PORT = process.env.INJECTOR_PORT || 3000
export const SERVER_URL = process.env.SERVER_URL
export const CLIENT_URL = process.env.CLIENT_URL
export const CLIENT_DIR = process.env.CLIENT_DIR
export const LOG_DIR = path.join(__dirname, 'log')

if (!PORT) throw Error('envVar PORT not set')
if (!SERVER_URL) throw Error('envVar SERVER_URL not set')
if (!CLIENT_URL) throw Error('envVar CLIENT_URL not set')
if (!CLIENT_DIR) throw Error('envVar CLIENT_DIR not set')
