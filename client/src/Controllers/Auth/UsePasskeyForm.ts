import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { PasskeyData, PasskeyDataSchema } from '../../Api/Schemas'

export function usePasskeyForm() {
  return useForm<PasskeyData>({
    resolver: zodResolver(PasskeyDataSchema),
    defaultValues: {
      name: '',
    },
  })
}
