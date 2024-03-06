import { FC, ReactNode, useState } from 'react'

import { AgeGateContext } from '../Lib'

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
