import { FC, PropsWithChildren } from 'react'

import { GalleryData, PostData, TagData } from '../../../../Lib'
import { PostContext } from '../../../../Lib/Posts/PostContext'

type PostProviderProps = PropsWithChildren<{
  post: PostData
  tag?: TagData
  gallery?: GalleryData
}>

export const PostProvider: FC<PostProviderProps> = ({
  post,
  tag = null,
  gallery = null,
  children,
}) => {
  return (
    <PostContext.Provider value={{ post, tag, gallery }}>
      {children}
    </PostContext.Provider>
  )
}
