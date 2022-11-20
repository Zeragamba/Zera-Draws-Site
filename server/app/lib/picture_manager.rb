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
  # @param image [Image]
  # @param filename [String]
  def self.attach(image, filename)
    Post.transaction do
      ext = File.extname(filename)

      width, height = FastImage.size(filename)
      image.height = height
      image.width = width

      type = FastImage.type(filename)
      image.mime_type = "image/#{type}"

      image.ext = ext

      self.export_sizes(image, filename)
      image.save!
    end
  end

  def self.read(picture, size: :full)
    return open(self.path_for(picture, size: size), "rb") { |f| f.read }
  end

  # @param image [Image]
  # @param src_filename [string]
  def self.export_sizes(image, src_filename)
    dest_filename = self.path_for(image, size: :full)
    FileUtils.makedirs(File.dirname(dest_filename))
    FileUtils.copy(src_filename, dest_filename)

    SIZES.each do |name, size|
      self.resize(
        src: src_filename,
        dest: self.path_for(image, size: name),
        size: size
      )
    end
  end

  # @param src [string] Source file to load
  # @param dest [string] Location to save resized image
  # @param size [number] new size to save
  def self.resize(src:, dest:, size:)
    magick_img = MiniMagick::Image.open(src)
    magick_img.resize "#{size}x#{size}>"
    magick_img.write(dest)
  end
end
