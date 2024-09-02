class AuthTokenStore {
  private _authToken: string | null = null

  get authToken(): string {
    return (this._authToken ||= localStorage.getItem("authToken") as string)
  }

  set authToken(newToken: string | null) {
    if (newToken === null) {
      localStorage.removeItem("authToken")
    } else {
      localStorage.setItem("authToken", newToken)
    }

    this._authToken = newToken
  }
}

export const authTokenStore = new AuthTokenStore()
