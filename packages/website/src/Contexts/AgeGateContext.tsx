import { createContext, FC, ReactNode, useContext, useState } from 'react'

import { noop } from '../Lib'

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

interface AgeGateProviderProps {
  children: ReactNode
}

export const AgeGateProvider: FC<AgeGateProviderProps> = ({ children }) => {
  const storageKey = 'age.verified'

  const [ verified, setVerified ] = useState<boolean>(localStorage.getItem(storageKey) === 'true')

  const verify = () => {
    setVerified(true)
    localStorage.setItem(storageKey, 'true')
  }

  return (
    <AgeGateContext.Provider value={{ verified, verify }}>
      {children}
    </AgeGateContext.Provider>
  )
}
