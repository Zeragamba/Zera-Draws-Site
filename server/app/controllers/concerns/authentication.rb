module Authentication
  extend ActiveSupport::Concern

  class AuthError < StandardError; end

  def login_user(username, password)
    user = User.where('LOWER(username) = :username', username: username.downcase).first
    raise AuthError, "Invalid user or password" if !user&.authenticate(password)
    Current.user = user
    return AuthToken.encode(user)
  end

  def authenticate_user
    auth_header = request.headers["AUTHORIZATION"] ||= "None"
    auth_type, auth_value = auth_header.split(' ')

    Rails.logger.debug("Authorize: #{auth_header}")

    case auth_type
      when "None"
        raise AuthError, "Missing Authorization header"
      when "Bearer"
        token = AuthToken.decode(auth_value)
        user = User.find(token["usr"])
      else
        raise AuthError, "Invalid authorization header"
    end

    raise AuthError, "Not Authorized" if !user
    Current.user = user
  rescue JWT::DecodeError
    raise AuthError, "Invalid token"
  end

  def authenticate
    authenticate_user
  rescue
    Current.user = User.new()
  end

  def authenticate_admin
    authenticate
    raise AuthError, "Not Authorized" if !Current.admin?
  end
end
