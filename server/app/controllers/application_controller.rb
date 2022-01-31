class ApplicationController < ActionController::API
  include Authentication

  rescue_from 'Authentication::AuthError' do |error|
    render json: { error: error.message }, status: 400
  end
end
