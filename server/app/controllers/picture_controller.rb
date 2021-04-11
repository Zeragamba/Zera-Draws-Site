class PictureController < ApplicationController
  def index
    @pictures = Picture.order(:date, :order)
    @api_url = "http://localhost:3001"

    if params[:tag]
      @pictures = @pictures.includes(:tags).where(:tags => { slug: Tag.slug_for_name(params[:tag]) })
    end

    render formats: :json
  end

  def view
    @picture = Picture.find(params[:id])
    @api_url = "http://localhost:3001"

    respond_to do |t|
      t.json {}
      t.any do
        image = open("#{Rails.root}/storage/pictures/#{@picture.filename}", "rb") { |f| f.read }
        expires_in 1.year, public: true
        send_data image, filename: "#{@picture.title}", type: @picture.mime_type, disposition: 'inline'
      end
    end
  end
end
