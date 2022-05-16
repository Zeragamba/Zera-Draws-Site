import { createContext, FC, ReactNode, useEffect, useState } from 'react'

import { Tag, TagsApi } from './TagsApi'

const TagsContext = createContext<Tag[]>([])

interface TagsProviderProps {
  children: ReactNode
}

export const TagsProvider: FC<TagsProviderProps> = ({ children }) => {
  const [ tags, setTags ] = useState<Tag[]>([])

  useEffect(() => {
    TagsApi.getTags().then(tags => setTags(tags))
  }, [])

  return (
    <TagsContext.Provider value={tags}>{children}</TagsContext.Provider>
  )
}
