class UserController < ApplicationController
  include Authentication

  def login
    token = login_user(params[:username], params[:password])
    render json: { token: token }
  end

  def view_current
    authenticate
    render json: { user: Current.user }
  end
end
