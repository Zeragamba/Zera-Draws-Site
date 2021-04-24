class PictureController < ApplicationController
  def index
    @pictures = Picture.order(date: :desc, order: :asc)
    @api_url = "http://localhost:3001"

    if params[:tag]
      @pictures = @pictures.includes(:tags).where(:tags => { slug: Slug.to_slug(params[:tag]) })
    end

    render formats: :json
  end

  def recent
    @pictures = Picture.order(date: :desc, order: :asc).limit(5)
    @api_url = "http://localhost:3001"

    render :index, formats: :json
  end

  def view
    @picture = Picture.find(params[:id])
    @api_url = "http://localhost:3001"

    respond_to do |t|
      t.json {}
      t.any do
        expires_in 1.year, public: true
        send_data(
          PictureManager.read(@picture),
          filename: "#{@picture.filename}",
          content_type: @picture.mime_type,
          disposition: 'inline',
        )
      end
    end
  end
end
