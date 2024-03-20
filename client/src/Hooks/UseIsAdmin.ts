import { useCurrentUser$ } from '../Queries'

export const useIsAdmin = (): boolean => {
  const { data: currentUser } = useCurrentUser$()
  return currentUser?.admin || false
}
