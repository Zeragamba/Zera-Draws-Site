import { useContext } from "react"
import { AgeGateContext, AgeGateState } from "./AgeGateContext"

export const useAgeGate = (): AgeGateState => {
  return useContext(AgeGateContext)
}
