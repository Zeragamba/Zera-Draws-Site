import express from 'express'
import 'express-async-errors'

import { PORT } from '../config'
import { getIndexHtml } from './Client'
import { injectMeta, injectPostMeta } from './Injector'
import { getLatestPost } from './ServerApi'

const app = express()

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`)
  next()
})
app.get([ '/', '/today' ], async (req, res) => {
  const post = await getLatestPost()
  const indexHtml = await getIndexHtml()
  const updatedHtml = await injectPostMeta(indexHtml, post.id)
  res.send(updatedHtml)
})

app.get('/post/:postId', async (req, res) => {
  const indexHtml = await getIndexHtml()
  const updatedHtml = await injectPostMeta(indexHtml, req.params.postId)
  res.send(updatedHtml)
})


app.get('*', async (req, res) => {
  const indexHtml = await getIndexHtml()
  const updatedHtml = await injectMeta(indexHtml, {})

  res.send(updatedHtml)
})

app.use(async (err, req, res, next) => {
  if (res.headersSent) return next(err)

  // In case of error, just pass along the index page
  const indexHtml = await getIndexHtml()
  res.send(indexHtml)
})

app.listen(PORT, () => {
  console.log(`OG Injector listening on port ${PORT}`)
})
