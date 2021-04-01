class PictureController < ApplicationController
  def index
    pictures = Picture
    pictures = Picture.none if params[:tag]
    render json: { size: pictures.count, pictures: pictures.all }
  end

  def view
    picture = Picture.find(params[:id])

    respond_to do |t|
      t.json { render json: picture }
      t.any do
        image = open("#{Rails.root}/storage/pictures/#{picture.filename}", "rb") { |f| f.read }
        expires_in 1.year, public: true
        send_data image, filename: "#{picture.title}", type: picture.mime_type, disposition: 'inline'
      end
    end
  end
end
