import dotenv from 'dotenv'
import dotenvExpand from 'dotenv-expand'

const env = dotenv.config({ path: '../.env' })
dotenvExpand.expand(env)

export const PORT = process.env.INJECTOR_PORT || 3000
export const SERVER_URL = process.env.SERVER_URL
export const CLIENT_URL = process.env.CLIENT_URL
export const CLIENT_DIR = process.env.CLIENT_DIR

if (!PORT) throw Error('envVar PORT not set')
if (!SERVER_URL) throw Error('envVar SERVER_URL not set')
if (!CLIENT_URL) throw Error('envVar CLIENT_URL not set')
if (!CLIENT_DIR) throw Error('envVar CLIENT_DIR not set')

console.log('SERVER_URL:', SERVER_URL)
console.log('CLIENT_URL:', CLIENT_URL)
console.log('CLIENT_DIR:', CLIENT_DIR)
