const requireEnv = (name: string, value: string | undefined): string => {
  if (!value) throw new Error(`${name} missing`)
  return value
}

export const Config = {
  SERVER_URL: requireEnv("VITE_SERVER_URL", import.meta.env.VITE_SERVER_URL),
  ENVIRONMENT: requireEnv("VITE_ENV", import.meta.env.VITE_ENV || "production"),
}
