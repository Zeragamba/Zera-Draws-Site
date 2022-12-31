class GalleriesController < ApplicationController
  before_action :authenticate_admin, :only => [:create, :update, :destroy]

  def list
    galleries = Gallery.all
    render json: GalleryView.render_list(galleries, page: params[:page]&.to_i || 0)
  end

  def create
    gallery = Gallery.create(gallery_params)
    render json: GalleryView.render(gallery)
  end

  def view
    gallery = Gallery.find(params[:id_or_slug])
    render json: GalleryView.render(gallery)
  end

  def update
    gallery = Gallery.find(params[:id_or_slug])
    gallery.update!(gallery_params)
    render json: GalleryView.render(gallery)
  end

  def destroy
    gallery = Gallery.find(params[:id_or_slug])
    gallery.destroy!
    render json: GalleryView.render(gallery)
  end

  def gallery_params
    params.permit(:name, :slug)
  end
end
