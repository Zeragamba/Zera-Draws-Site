import { useQueryClient } from '@tanstack/react-query'
import { FC, useEffect, useState } from 'react'

import { tagsApi } from '../Api/Endpoints/TagsApi'
import { queryKeys } from '../Queries/QueryKeys'

export const PreloadProvider: FC = () => {
  const [ preloaded, setPreloaded ] = useState<boolean>(false)
  const queryClient = useQueryClient()

  useEffect(() => {
    if (preloaded) return
    setPreloaded(true)

    queryClient.prefetchQuery({
      ...queryKeys.tags.all,
      queryFn: () => tagsApi.fetchAllTags(),
    })
      .catch(error => console.error(error))
  }, [ preloaded ])

  return null
}
