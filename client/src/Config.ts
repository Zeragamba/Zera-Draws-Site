const requireEnv = (name: string, value: string | undefined): string => {
  if (!value) throw new Error(`${name} missing`)
  return value
}

export const Config = {
  SERVER_URL: requireEnv('REACT_APP_SERVER_URL', process.env.REACT_APP_SERVER_URL),
  ENVIRONMENT: requireEnv('REACT_APP_ENV', process.env.REACT_APP_ENV || 'production'),
}
