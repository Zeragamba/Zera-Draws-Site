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
  discord = 'Discord',
  deviantArt = 'Deviant Art',
  twitter = 'Twitter',
}


export type SocialsMeta = Partial<Record<SocialPlatform, string>>

export type ContentMeta = {
  about?: string
}
