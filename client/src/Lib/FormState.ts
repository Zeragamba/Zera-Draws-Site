import { useState } from 'react'

export type FormStateHook<FormState> = [
  state: FormState,
  setField: (field: keyof FormState, value: string) => void
]

export function useFormState<FormState>(defaultState: FormState): FormStateHook<FormState> {
  const [state, setState] = useState<FormState>(defaultState)

  function setField<Field extends keyof FormState>(field: Field, value: string) {
    setState(state => ({ ...state, [field]: value }))
  }

  return [state, setField]
}
