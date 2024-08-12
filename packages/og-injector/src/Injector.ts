import { CLIENT_URL } from '../config'
import { PostData } from './models/PostData'
import { getPost, getTag, getTaggedPosts } from './ServerApi'
import { getAppManifest } from './Client'
import { logger } from './Logger'
import { TagData } from './models/TagData'

type OpenGraphData = {
  type?: string
  title?: string
  description?: string
  url?: string
  image?: {
    url: string
    type: string
    height: number
    width: number
  }
}

export const injectPostMeta = async (html: string, postId: PostData['id']) => {
  const post = await getPost(postId)
  logger.info(`Injecting Post data: ${JSON.stringify(post)}`)

  return await injectMeta(html, {
    title: post.title,
    description: post.description,
    url: `${CLIENT_URL}/post/${post.slug}`,
    image: {
      url: post.images[0].srcs.high,
      type: post.images[0].mime_type,
      height: post.images[0].height,
      width: post.images[0].width,
    },
  })
}

export const injectTagMeta = async (html: string, tagId: TagData['id']) => {
  const tag = await getTag(tagId)

  logger.info(`Injecting Tag data: ${JSON.stringify(tag)}`)
  const metaData: OpenGraphData = {
    title: `Tag: ${tag.name}`,
    description: `Posts tagged ${tag.name}`,
    url: `${CLIENT_URL}/tag/${tag.slug}`,
  }

  const posts = await getTaggedPosts(tagId)
  const firstPost = posts[0]

  if (firstPost) {
    logger.info(`Injecting Post data: ${JSON.stringify(firstPost)}`)
    const image = firstPost.images[0]

    metaData.image = {
      url: image.srcs.high,
      type: image.mime_type,
      height: image.height,
      width: image.width,
    }
  }

  return await injectMeta(html, metaData)
}

export const injectMeta = async (html: string, metadata: OpenGraphData): Promise<string> => {
  logger.info(`Injecting OG data: ${JSON.stringify(metadata)}`)
  if (!html.includes('</head>')) throw new Error('</head> not found')

  const manifest = await getAppManifest()
  let metaTags: string[] = []

  logger.info(`Updating metadata`)
  if (metadata.title) {
    metadata.title = `${manifest.name} | ${metadata.title}`
  } else {
    metadata.title = manifest.name
  }

  logger.info(`Applying defaults`)
  metadata.description ||= manifest.description
  metadata.url ||= CLIENT_URL

  logger.info(`Trimming base meta tags`)
  metadata.title = trimString(metadata.title || '', 70)
  metadata.description = trimString(metadata.description || '', 200)

  logger.info(`Injecting base meta tags`)
  metaTags = [
    ...metaTags,
    `<meta name="og:type" content="${metadata.type || 'website'}"/>`,

    `<meta name="og:url" content="${metadata.url}"/>`,
    `<meta name="og:title" content="${metadata.title}"/>`,
    `<meta name="og:description" content="${metadata.description}"/>`,

    `<meta name="twitter:card" content="${metadata.image ? 'summary_large_image' : 'summary'}"/>`,
    `<meta name="twitter:url" content="${metadata.url}"/>`,
    `<meta name="twitter:title" content="${metadata.title}"/>`,
    `<meta name="twitter:description" content="${metadata.description}"/>`,
  ]

  if (metadata.image) {
    logger.info(`Injecting image meta tags`)
    metaTags = [
      ...metaTags,
      `<meta name="og:image" content="${metadata.image.url}"/>`,
      `<meta name="og:image:type" content="${metadata.image.type}"/>`,
      `<meta name="og:image:height" content="${metadata.image.height}"/>`,
      `<meta name="og:image:width" content="${metadata.image.width}"/>`,

      `<meta name="twitter:image" content="${metadata.image.url}"/>`,
    ]
  }

  logger.info(`Injecting meta tags`, { tags: metaTags })
  return html.replace('</head>', `${metaTags.join('')} </head>`)
}

function trimString(str: string, maxLength: number) {
  if (str.length <= maxLength) return str
  return str.slice(0, maxLength - 10) + '...'
}
