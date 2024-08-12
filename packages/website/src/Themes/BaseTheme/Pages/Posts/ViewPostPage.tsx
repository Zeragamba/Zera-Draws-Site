import { FC } from 'react'

import { ParamsPostProvider } from '../../../../Contexts'
import { ViewPost } from '../../Components'
import { LoadingPage } from '../LoadingPage'

export interface ViewPostPageSlots {
  ViewPost: FC
  LoadingPage: FC
}

export interface ViewPostPageProps {
  slots?: Partial<ViewPostPageSlots>
}

const defaultSlots: ViewPostPageSlots = {
  LoadingPage,
  ViewPost,
}

export const ViewPostPage: FC<ViewPostPageProps> = ({ slots }) => {
  const { LoadingPage, ViewPost } = {
    ...defaultSlots,
    ...slots,
  }

  return (
    <ParamsPostProvider renderPending={<LoadingPage />}>
      <ViewPost />
    </ParamsPostProvider>
  )
}

export const DefaultViewPostPage = ViewPostPage
