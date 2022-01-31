class AuthToken
  TOKEN_SECRET = ENV.fetch("TOKEN_SECRET")
  TOKEN_ALGO = 'HS512'

  def self.encode(user)
    return JWT.encode({ usr: user.id }, TOKEN_SECRET, TOKEN_ALGO)
  end

  def self.decode(token)
    payload, _ = JWT.decode(token, TOKEN_SECRET, true, { algorithm: TOKEN_ALGO })
    return payload
  end
end
