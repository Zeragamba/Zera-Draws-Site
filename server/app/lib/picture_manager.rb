class PictureManager
  SIZES = {
    high: 3000,
    low: 1000,
    gallery: 500,
  }

  ##
  # @param picture [Post]
  # @param size [string]
  def self.url_for(picture, size:)
    return [IMAGES_URL, picture.id, size.to_s + picture.ext].join('/')
  end

  def self.path_for(picture, size: :full)
    return File.join(IMAGES_DIR, picture.id, size.to_s + picture.ext)
  end

  ##
  # @return picture [Post]
  def self.import(title:, date:, order: 0, filename:)
    picture = Post.create!(
      title: title,
      date: date,
      order: order,
    )

    self.attach(picture, filename)

    return picture
  end

  ##
  # @param picture [Post]
  # @param filename [String]
  def self.attach(picture, filename)
    Post.transaction do
      ext = File.extname(filename)

      width, height = FastImage.size(filename)
      picture.height = height
      picture.width = width

      type = FastImage.type(filename)
      picture.mime_type = "image/#{type}"

      picture.ext = ext
      picture.released = true

      self.export_sizes(picture, filename)
      picture.save!
    end
  end

  def self.read(picture, size: :full)
    return open(self.path_for(picture, size: size), "rb") { |f| f.read }
  end

  def self.export_sizes(picture, src_filename)
    dest_filename = self.path_for(picture, size: :full)
    FileUtils.makedirs(File.dirname(dest_filename))
    FileUtils.copy(src_filename, dest_filename)

    SIZES.each do |name, size|
      self.resize(
        src: src_filename,
        dest: self.path_for(picture, size: name),
        size: size
      )
    end
  end

  def self.resize(src:, dest:, size:)
    image = MiniMagick::Image.open(src)
    image.resize "#{size}x#{size}>"
    image.write(dest)
  end
end
