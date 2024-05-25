class UsersController < ApplicationController
  before_action :authenticate_user, :except => [:login]

  def view_current
    render json: UserView.render(Current.user)
  end
end
