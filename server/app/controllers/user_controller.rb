class UserController < ApplicationController
  include Authentication
  before_action :authenticate, :only => :view_current

  def login
    auth_token = login_user(params[:username], params[:password])
    render json: UserView.render(Current.user, auth_token: auth_token)
  end

  def view_current
    render json: UserView.render(Current.user)
  end
end
