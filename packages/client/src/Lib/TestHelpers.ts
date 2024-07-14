export function freeze<T>(obj: T): T {
  return Object.freeze(obj) as T
}
