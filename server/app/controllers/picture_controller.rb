class PictureController < ApplicationController
  def index
    render json: Picture
      .all
      .map(&:as_json)
      .each { |picture| picture["img"] = "/api/picture/#{picture["id"]}" }
  end

  def view
    picture = Picture.find(params[:id])

    respond_to do |t|
      t.json { render json: picture }
      t.any do
        image = open("#{Rails.root}/storage/pictures/#{picture.filename}", "rb") { |f| f.read }
        send_data image, filename: "#{picture.title}", type: picture.mime_type, disposition: 'inline'
      end
    end
  end
end
