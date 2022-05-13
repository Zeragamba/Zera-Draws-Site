class UserController < ApplicationController
  include Authentication
  before_action :authenticate, :only => :view_current

  def login
    token = login_user(params[:username], params[:password])
    render json: { token: token }
  end

  def view_current
    render json: Current.user
  end
end
