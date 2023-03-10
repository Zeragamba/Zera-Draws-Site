import { QueryClient } from '@tanstack/react-query'
import { milliseconds } from 'date-fns'


export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: milliseconds({ hours: 1 }),
    },
  },
})
