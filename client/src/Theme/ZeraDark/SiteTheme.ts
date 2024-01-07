import { AppStyles } from './AppStyles'
import { MainLayout } from './Layout'
import { MuiTheme } from './MuiTheme'
import { LatestPostPage, ViewPostPage } from './Post'

export const SiteTheme = {
  AppStyles,
  MuiTheme,
  Layouts: {
    MainLayout,
  },
  Pages: {
    LatestPost: LatestPostPage,
    ViewPost: ViewPostPage,
  },
}