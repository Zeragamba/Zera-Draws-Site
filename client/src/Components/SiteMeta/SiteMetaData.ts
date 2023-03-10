export type SiteMetaData = Record<string, string>

export enum SocialPlatform {
  discord = 'Discord',
  deviantArt = 'Deviant Art',
  twitter = 'Twitter',
}

export type SocialsMeta = Partial<Record<SocialPlatform, string>>

export type ContentMeta = {
  about?: string
}
