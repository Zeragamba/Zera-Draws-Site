import { defineConfig, ServerOptions } from 'vite'
import react from '@vitejs/plugin-react-swc'
import * as fs from 'node:fs'
import checker from 'vite-plugin-checker'

const server: ServerOptions = {
  host: true,
  port: 3000,
}

if (process.env.HTTPS === 'true') {
  const keyFile = process.env.SSL_KEY_FILE
  if (!keyFile) throw new Error('SSL_KEY_FILE not set')

  const crtFile = process.env.SSL_CRT_FILE
  if (!crtFile) throw new Error('SSL_CRT_FILE not set')

  server.https = {
    key: fs.readFileSync(keyFile),
    cert: fs.readFileSync(crtFile),
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  envDir: '../..',
  plugins: [
    react(),
    checker({
      typescript: {
        buildMode: true,
      },
      eslint: {
        lintCommand: 'eslint "./src/**/*.{ts,tsx}"',
        useFlatConfig: true,
      },
    }),
  ],
  server: server,
})
