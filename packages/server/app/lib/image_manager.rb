class ImageManager
  SIZES = {
    high: 3000,
    low: 1000,
    gallery: 500,
  }

  ##
  # @param image [Image]
  # @param size [string]
  def self.url_for(image, size:)
    return [IMAGES_URL, image.id, size.to_s + image.ext].join('/')
  end

  def self.path_for(image, size: :full)
    return File.join(IMAGES_DIR, image.id, size.to_s + image.ext)
  end

  ##
  # @param image [Image]
  # @param filename [String]
  def self.attach(image, filename)
    Image.transaction do
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

  def self.remove(image)
    img_dir = File.join(IMAGES_DIR, image.id)
    Rails.logger.info("Removing directory #{img_dir}")
    FileUtils.remove_dir(img_dir, true)
  end

  def self.read(image, size: :full)
    return open(self.path_for(image, size: size), "rb") { |f| f.read }
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

  def self.clean_deleted
    Dir.entries(IMAGES_DIR).each do |dir|
      next if dir.start_with?(".")
      path = File.join(IMAGES_DIR, dir)
      image = Image.find_by(id: dir)
      if image.nil?
        puts "removing image dir #{path}"
        FileUtils.rm_r(path)
      end
    end
  end
end
