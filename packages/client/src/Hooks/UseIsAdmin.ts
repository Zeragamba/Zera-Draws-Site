import { useCurrentUser$ } from "../Lib/Auth"

export const useIsAdmin = (): boolean => {
  const { data: currentUser } = useCurrentUser$()
  return currentUser?.admin || false
}
