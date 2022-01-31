module Authentication
  extend ActiveSupport::Concern

  class AuthError < StandardError; end

  def login_user(username, password)
    user = User.find_by_username(username)
    raise AuthError, "Invalid user or password" if !user&.authenticate(password)
    Current.user = user
    return AuthToken.encode(user)
  end

  def authenticate
    token = AuthToken.decode(request.headers["HTTP_APP_TOKEN"])

    user = User.find(token["usr"])
    raise AuthError, "Invalid token" if !user

    Current.user = user
  rescue JWT::DecodeError
    raise AuthError, "Invalid token"
  end
end
