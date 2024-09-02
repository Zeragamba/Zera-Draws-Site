import { useCurrentUser$ } from "../Auth"

export const useIsAdmin = (): boolean => {
  const { data: currentUser } = useCurrentUser$()
  return currentUser?.admin || false
}
