import { createContext, FC, ReactNode, useContext, useState } from 'react'

import { noop } from '../../../Lib/Noop'

type AgeGateState = {
  verified: boolean
  verify: () => void
}

const AgeGateContext = createContext<AgeGateState>({
  verified: false,
  verify: noop,
})

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

export const useAgeGate = (): AgeGateState => {
  return useContext(AgeGateContext)
}
