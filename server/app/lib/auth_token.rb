class AuthToken
  def self.encode(user)
    return JWT.encode({ usr: user.id }, AUTH_TOKEN_SECRET, AUTH_TOKEN_ALGO)
  end

  def self.decode(token)
    payload, _ = JWT.decode(token, AUTH_TOKEN_SECRET, true, { algorithm: AUTH_TOKEN_ALGO })
    return payload
  end
end
