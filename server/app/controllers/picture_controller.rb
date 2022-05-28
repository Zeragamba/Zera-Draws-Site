class PictureController < ApplicationController
  include Authentication

  before_action :authenticate_admin, :only => :upload

  def index
    @pictures = Picture.released.includes(:tags)

    if params[:tag]
      @pictures = @pictures.where(:tags => { slug: Slug.to_slug(params[:tag]) })
    end

    render formats: :json
  end

  def upload
    image = params[:image]
    @picture = Picture.create(picture_params)

    if @picture.errors.any?
      return render json: { error: @picture.errors.full_messages.join('. ') }, status: 400
    end

    @picture.attach(image.tempfile.path)

    render :view, formats: :json
  end

  def recent
    @pictures = Picture.released.includes(:tags).limit(5)
    render :index, formats: :json
  end

  def view
    @picture = Picture.find(params[:id])
    render formats: :json
  end

  def picture_params
    params.permit(:title, :date, :slug, :description)
  end
end
