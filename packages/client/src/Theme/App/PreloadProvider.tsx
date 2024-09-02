import { useQueryClient } from "@tanstack/react-query"
import { FC, PropsWithChildren, useEffect, useState } from "react"

import { queryKeys } from "../../Queries/QueryKeys.ts"

export const PreloadProvider: FC<PropsWithChildren> = ({ children }) => {
  const [preloaded, setPreloaded] = useState<boolean>(false)
  const queryClient = useQueryClient()

  useEffect(() => {
    if (preloaded) return
    setPreloaded(true)

    queryClient
      .prefetchQuery({ ...queryKeys.tags.all })
      .catch((error) => console.error(error))
  }, [queryClient, preloaded])

  return children
}
