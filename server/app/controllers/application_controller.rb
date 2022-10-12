class ApplicationController < ActionController::API
  include Authentication

  rescue_from 'Authentication::AuthError' do |error|
    render_error(message: error.message, status: 401)
  end

  def render_error(message:, status: 500)
    render json: { error: message }, status: status
  end
end
