class UsersController < ApplicationController
  before_action :authenticate_user, :except => [:login]

  def login
    auth_token = login_user(params[:username], params[:password])
    render json: UserView.render(Current.user, auth_token: auth_token)
  end

  def view_current
    render json: UserView.render(Current.user)
  end
end
