class PictureController < ApplicationController
  include Authentication

  before_action :authenticate_admin, :only => :upload

  def index
    @pictures = Picture.order(date: :desc, order: :asc).includes(:tags)

    if params[:tag]
      @pictures = @pictures.where(:tags => { slug: Slug.to_slug(params[:tag]) })
    end

    render formats: :json
  end

  def upload
    title = params[:title]
    image = params[:image]

    @picture = PictureManager.import(title: title, filename: image.tempfile.path)
    if @picture.errors.any?
      return render json: { error: @picture.errors.full_messages.join('. ') }, status: 400
    end

    render :view, formats: :json
  end

  def recent
    @pictures = Picture.order(date: :desc, order: :asc).limit(5)
    render :index, formats: :json
  end

  def view
    @picture = Picture.find(params[:id])
    render formats: :json
  end
end
