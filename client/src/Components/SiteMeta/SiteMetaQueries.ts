import { createQueryKeys } from '@lukemorales/query-key-factory'

import { SiteMetaData } from './SiteMetaData'
import { ServerClient } from '../../Lib/ServerApi'

export const SiteMetaQueries = createQueryKeys('siteMeta', {
  get: (group: string) => ({
    queryKey: [ group ],
    queryFn: () => ServerClient.get<SiteMetaData>(`/meta/${group}`),
    staleTime: Infinity,
  }),
})
