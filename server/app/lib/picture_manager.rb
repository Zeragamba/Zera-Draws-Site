class PictureManager
  STORAGE_DIR = DATA_DIR.join('images')
  IMAGES_URL = ENV.fetch("IMG_SERVER_URL")

  SIZES = {
    high: 3000,
    low: 1000,
    gallery: 500,
  }

  ##
  # @param picture [Picture]
  # @param size [string]
  def self.url_for(picture, size:)
    return [IMAGES_URL, picture.id, size.to_s + picture.ext].join('/')
  end

  def self.import(date: Date.today, order: 0, title:, filename:)
    id = SecureRandom.uuid
    ext = File.extname(filename)

    self.export_sizes(filename, id, ext)

    width, height = FastImage.size(filename)
    type = FastImage.type(filename)

    return Picture.create(
      id: id,
      title: title,
      width: width,
      height: height,
      date: date,
      order: order,
      mime_type: "image/#{type}",
      ext: ext
    )
  end

  def self.read(picture, size: :full)
    filename = File.join(picture.id, size.to_s + picture.ext)
    return open(File.join(STORAGE_DIR, filename), "rb") { |f| f.read }
  end

  def self.export_sizes(src_filename, id, ext)
    dest_folder = STORAGE_DIR.join(id)
    FileUtils.makedirs(dest_folder)
    FileUtils.copy(src_filename, dest_folder.join("full#{ext}"))

    SIZES.each do |name, size|
      dimensions = "#{size}x#{size}>"
      Rails.logger.info "resizing #{src_filename} to #{dimensions}"
      image = MiniMagick::Image.open(src_filename)
      image.resize(dimensions)
      image.write(dest_folder.join("#{name}#{ext}"))
    end
  end
end
