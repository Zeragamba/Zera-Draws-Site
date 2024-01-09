import { AppStyles } from './AppStyles'
import { PublicLayout } from './Layout'
import { MuiTheme } from './MuiTheme'
import { LatestPostPage, ViewPostPage } from './Posts'

export const SiteTheme = {
  AppStyles,
  MuiTheme,
  Layouts: {
    PublicLayout,
  },
  Pages: {
    LatestPost: LatestPostPage,
    ViewPost: ViewPostPage,
  },
}
