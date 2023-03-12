class PostImporter
  # @type [String]
  attr_accessor :title
  # @type [String]
  attr_accessor :date
  # @type [Number]
  attr_accessor :position
  # @type [Set<String>]
  attr_accessor :images
  # @type [Set<String>]
  attr_accessor :tags
  # @type [String]
  attr_accessor :description

  ##
  # @return image [Image]
  def self.import(title:, date:, position: 0, filename: nil, tags: [], images: [], root_dir: nil, &block)
    Post.transaction do
      puts "#{date} #{title}"
      import = self.new(title: title, date: date, position: position)

      if filename
        import.images << filename
      end

      if tags.length >= 1
        import.add_tags(*tags)
      end

      if images.length >= 1
        raise Error("root_dir is required for importing images") if root_dir.nil?
        import.add_images(root_dir: root_dir, images: images)
      end

      block.call(import) if block

      post = Post.create!(title: title, date: date, position: position, released: true)

      import.images.each do |path|
        puts "  #{path}"
        image = Image.create!(filename: File.basename(path), post: post)
        image.attach(path)
      end

      import.tags.each do |tag_name|
        post.tags << Tag.find_or_create(name: tag_name)
      end

      puts "  Slug: #{post.slug}"
      return post
    end
  end

  def initialize(title:, date:, position:)
    @title = title
    @date = date
    @position = position
    @images = Set.new()
    @tags = Set.new
    @description = ""
  end

  def add_tags(*tags)
    tags.each { |tag| @tags << tag }
  end

  def add_images(root_dir:, images:)
    images.each { |image| @images << File.join(root_dir, image) }
  end
end
