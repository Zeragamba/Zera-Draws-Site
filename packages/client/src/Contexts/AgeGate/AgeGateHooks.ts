import { useContext } from "react"
import { AgeGateContext, AgeGateState } from "./AgeGateContext.ts"

export const useAgeGate = (): AgeGateState => {
  return useContext(AgeGateContext)
}
