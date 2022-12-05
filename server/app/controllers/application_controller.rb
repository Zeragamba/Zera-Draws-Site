class ApplicationController < ActionController::API
  include Authentication
  before_action :authenticate_user

  rescue_from 'Authentication::AuthError' do |error|
    render_error(message: error.message, status: 401)
  end

  def current_user
    Current.user
  end

  def render_error(message:, status: 500)
    render json: { error: message }, status: status
  end

  def render_not_found(message: "Not Found")
    render_error(message: message, status: 404)
  end
end
