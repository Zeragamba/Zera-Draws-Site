import { createContext, useContext } from 'react'

import { noop } from '../Noop'


export type AgeGateState = {
  verified: boolean
  verify: () => void
}

export const AgeGateContext = createContext<AgeGateState>({
  verified: false,
  verify: noop,
})

export const useAgeGate = (): AgeGateState => {
  return useContext(AgeGateContext)
}
