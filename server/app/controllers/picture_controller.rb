class PictureController < ApplicationController
  def index
    @pictures = Picture.order(date: :desc, order: :asc).includes(:tags)

    if params[:tag]
      @pictures = @pictures.where(:tags => { slug: Slug.to_slug(params[:tag]) })
    end

    render formats: :json
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
