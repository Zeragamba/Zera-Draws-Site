class MetricsController < ApplicationController
  before_action :authenticate_admin

  def export_views
    render json: Metrics.views(
      start_date: params[:start_date],
      end_date: params[:end_date],
    )
  end
end
