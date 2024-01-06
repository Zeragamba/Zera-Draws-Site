export type SiteMetaData = Record<string, string>

export enum MetaDataGroup {
  Features = 'features',
  Content = 'content',
  Socials = 'socials',
}

export enum FeatureFlag {
  AboutPage = 'AboutPage',
}

export type FeatureFlags = Partial<Record<FeatureFlag, 'true' | 'false'>>

export enum SocialPlatform {
  bluesky = 'Bluesky',
  deviantArt = 'Deviant Art',
  discord = 'Discord',
  mastodon = 'Mastodon',
  pixiv = 'Pixiv',
  threads = 'Threads',
  tumblr = 'Tumblr',
  twitter = 'Twitter',
}

export type SocialUrl = string
export type SocialsMeta = Partial<Record<SocialPlatform, SocialUrl>>

export type ContentMeta = {
  about?: string
}
