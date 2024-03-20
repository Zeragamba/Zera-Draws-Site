export type SiteMetaData = Record<string, string>

export enum MetaDataGroup {
  Features = 'features',
  Content = 'content',
  Socials = 'socials',
}

export type MetaDataSet<Key extends string, Value = string> = Partial<Record<Key, Value>>

export enum FeatureFlag {
  AboutPage = 'AboutPage',
  Commissions = 'Commissions',
  Requests = 'Requests',
}

export type FeatureFlags = MetaDataSet<FeatureFlag, boolean>

export enum SocialPlatform {
  bluesky = 'Bluesky',
  deviantArt = 'Deviant Art',
  discord = 'Discord',
  gumroad = 'Gumroad',
  mastodon = 'Mastodon',
  pixiv = 'Pixiv',
  threads = 'Threads',
  tumblr = 'Tumblr',
  twitter = 'Twitter',
}

export type SocialsMeta = MetaDataSet<SocialPlatform>

export enum ContentFields {
  about = 'about'
}

export type ContentMeta = MetaDataSet<ContentFields>
