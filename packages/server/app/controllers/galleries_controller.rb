class GalleriesController < ApplicationController
  before_action :authenticate_admin, :except => [:list, :view]

  def list
    galleries = Gallery.all
    render json: GalleryView.render_list(galleries, page: params[:page]&.to_i || 0)
  end

  def create
    gallery = Gallery.create(gallery_params)
    render json: GalleryView.render(gallery)
  end

  def view
    gallery = Gallery.find(params[:gallery_id])
    render json: GalleryView.render(gallery)
  end

  def update
    gallery = Gallery.find(params[:gallery_id])
    gallery.update!(gallery_params)
    render json: GalleryView.render(gallery)
  end

  def destroy
    gallery = Gallery.find(params[:gallery_id])
    gallery.destroy!
    render json: GalleryView.render(gallery)
  end

  def gallery_params
    params.permit(:name, :slug)
  end
end
