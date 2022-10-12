class PictureController < ApplicationController
  include Authentication

  before_action :authenticate_admin, :only => :upload

  def index
    num_per_page = 25
    page = params[:page]&.to_i || 0

    pictures = Picture.released.includes(:tags)

    if params[:tag]
      pictures = pictures.where(:tags => { slug: Slug.to_slug(params[:tag]) })
    end

    render json: PictureView.render_list(pictures, num_per_page: num_per_page, page: page)
  end

  def view_gallery
    num_per_page = 25
    page = params[:page]&.to_i || 0

    gallery = Gallery.find(params[:id_or_slug])

    render json: PictureView.render_list(gallery.pictures, num_per_page: num_per_page, page: page)
  end

  def upload
    image = params[:image]
    picture = Picture.create(picture_params)

    if picture.errors.any?
      messages = picture.errors.full_messages
      return render_error(message: messages.join('. '), status: 400)
    end

    picture.attach(image.tempfile.path)

    render json: PictureView.render(picture)
  end

  def recent
    limit = params['numImages'] || 5
    pictures = Picture.released.includes(:tags).limit(limit)

    render json: PictureView.render_list(pictures)
  end

  def view
    picture = Picture.find(params[:id_or_slug])
    render json: PictureView.render(picture)
  end

  def picture_params
    params.require(:picture).permit(:title, :date, :slug, :description)
  end
end
