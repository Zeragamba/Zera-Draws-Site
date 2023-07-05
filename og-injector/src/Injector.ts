import { CLIENT_URL } from '../config'
import { PostData } from './models/PostData'
import { getPost } from './ServerApi'
import { getAppManifest } from './Client'
import { logger } from './Logger'

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

export const injectMeta = async (html: string, metadata: OpenGraphData): Promise<string> => {
  try {

    logger.info(`Injecting OG data: ${JSON.stringify(metadata)}`)
    if (!html.includes('</head>')) throw new Error('</head> not found')

    const manifest = await getAppManifest()
    let metaTags: string[] = []

    if (metadata.title) {
      metadata.title = `${manifest.name} | ${metadata.title}`
    } else {
      metadata.title = manifest.name
    }

    metadata.description ||= manifest.description
    metadata.url ||= CLIENT_URL

    metadata.title = trimString(metadata.title, 70)
    metadata.description = trimString(metadata.description, 200)

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
  } catch (err) {
    logger.error(`Error injecting tags`, { err })
    return html
  }
}

function trimString(str: string, maxLength: number) {
  if (str.length <= maxLength) return str
  return str.slice(0, maxLength - 10) + '...'
}
