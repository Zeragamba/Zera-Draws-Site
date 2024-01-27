import express from 'express'
import 'express-async-errors'

import { CLIENT_DIR, CLIENT_URL, LOG_DIR, NODE_ENV, PORT, SERVER_URL } from '../config'
import { getIndexHtml } from './Client'
import { injectMeta, injectPostMeta } from './Injector'
import { getLatestPost } from './ServerApi'
import { logger } from './Logger'

const app = express()

app.use((req, res, next) => {
  logger.info(`${req.method} ${req.path}`)
  next()
})

app.get([ '/latest' ], async (req, res) => {
  logger.info('Request received for latest post')
  const post = await getLatestPost()
  const indexHtml = await getIndexHtml()
  const updatedHtml = await injectPostMeta(indexHtml, post.id)
  res.send(updatedHtml)
})

app.get([
  '/post/:postId',
  '/tag/:tagId/:postId',
], async (req, res) => {
  logger.info('Request received for post')
  const indexHtml = await getIndexHtml()
  const updatedHtml = await injectPostMeta(indexHtml, req.params.postId)
  res.send(updatedHtml)
})

app.get('*', async (req, res) => {
  logger.info('Request received')
  const indexHtml = await getIndexHtml()
  const updatedHtml = await injectMeta(indexHtml, {})
  res.send(updatedHtml)
})

app.use(async (err, req, res, next) => {
  logger.info('Error in Injector', { err: String(err) })

  if (res.headersSent) return next(err)

  // In case of error, just pass along the index page
  const indexHtml = await getIndexHtml()
  res.send(indexHtml)
})

app.listen(PORT, () => {
  logger.info('====')
  logger.info(`OG Injector listening on port ${PORT}`)
  logger.info(`NODE_ENV: ${NODE_ENV}`)
  logger.info(`SERVER_URL: ${SERVER_URL}`)
  logger.info(`CLIENT_URL: ${CLIENT_URL}`)
  logger.info(`CLIENT_DIR: ${CLIENT_DIR}`)
  logger.info(`LOG_DIR: ${LOG_DIR}`)
  logger.info('====')
})
