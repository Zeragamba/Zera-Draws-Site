import { ContentMeta, FeatureFlags, MetaDataGroup, SocialsMeta } from '../../Lib'
import { ContentSchema, FeatureFlagsSchema, SocialsSchema } from '../Schemas/SiteMetaSchema'
import { ServerApi } from '../ServerApi'

export class SiteMetaApi extends ServerApi {
  public fetchFeatureFlags() {
    return this.get<FeatureFlags>(this.getMetaRoute(MetaDataGroup.Features), {
      parseResData: (data) => FeatureFlagsSchema.parse(data),
    })
  }

  public updateFeatureFlags(params: FeatureFlags) {
    return this.put<FeatureFlags>(this.getMetaRoute(MetaDataGroup.Features), {
      data: params,
      parseResData: (data) => FeatureFlagsSchema.parse(data),
    })
  }

  public fetchSocialPlatforms() {
    return this.get<SocialsMeta>(this.getMetaRoute(MetaDataGroup.Socials), {
      parseResData: (data) => SocialsSchema.parse(data),
    })
  }

  public updateSocials(params: SocialsMeta) {
    return this.put<SocialsMeta>(this.getMetaRoute(MetaDataGroup.Socials), {
      data: params,
      parseResData: (data) => SocialsSchema.parse(data),
    })
  }

  public fetchCustomContent() {
    return this.get<ContentMeta>(this.getMetaRoute(MetaDataGroup.Content), {
      parseResData: (data) => ContentSchema.parse(data),
    })
  }

  public updateCustomContent(params: ContentMeta) {
    return this.put<ContentMeta>(this.getMetaRoute(MetaDataGroup.Content), {
      data: params,
      parseResData: (data) => ContentSchema.parse(data),
    })
  }

  private getMetaRoute(group: MetaDataGroup) {
    return `/meta/${group}`
  }
}

export const siteMetaApi = new SiteMetaApi()
