import { User } from '../UserApi'

export type UserState = {
  user: User | null
  fetching: boolean
}

export const defaultUserState: UserState = {
  user: null,
  fetching: false,
}
