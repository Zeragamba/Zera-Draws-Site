class UserView < ApplicationView
  def self.as_json(user)
    return {
      username: user.username,
      email: user.email,
      created_at: user.created_at,
      updated_at: user.updated_at,
      admin: user.admin,
    }
  end

  def self.render(user, auth_token: nil)
    data = { user: self.as_json(user) }
    data[:auth_token] = auth_token if auth_token
    return data
  end
end
