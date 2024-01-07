import { useQueryClient } from '@tanstack/react-query'
import { FC, useEffect, useState } from 'react'

import { TagQueryKeys } from '../Components/Tags/TagsApi/QueryKeys'

export const PreloadProvider: FC = () => {
  const [ preloaded, setPreloaded ] = useState<boolean>(false)
  const queryClient = useQueryClient()

  useEffect(() => {
    if (preloaded) return
    setPreloaded(true)

    console.info('Prefetch triggered')

    queryClient.prefetchQuery({ ...TagQueryKeys.getAllTags(queryClient) })
      .catch(error => console.error(error))
  }, [ preloaded ])

  return null
}