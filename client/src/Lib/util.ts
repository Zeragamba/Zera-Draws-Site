export const noOp = (): void => {
  /* noop */
}

export type Setter<T> = (value: T) => void
