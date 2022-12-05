import { QueryKey } from '@tanstack/react-query'

const namespace = [ 'user' ]
export const userQueryKeys = {
  namespace: namespace,
  getCurrentUser: (): QueryKey => [ ...namespace, 'current' ],
}
