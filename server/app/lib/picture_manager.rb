class PictureManager
  STORAGE_DIR = DATA_DIR.join('images')
  IMAGES_URL = "http://localhost:3002"

  def self.import(date: Date.today, order: 0, title:, filename:)
    id = SecureRandom.uuid
    ext = File.extname(filename)

    src_filename = filename
    dest_filename = File.join(STORAGE_DIR, id, "full#{ext}")
    FileUtils.makedirs(File.dirname(dest_filename))
    FileUtils.copy(src_filename, dest_filename)
    width, height = FastImage.size(dest_filename)
    type = FastImage.type(dest_filename)

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
end
