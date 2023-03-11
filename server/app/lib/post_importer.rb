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
  def self.import(title:, date:, position: 0, filename:, &block)
    Post.transaction do
      import = self.new(title: title, date: date, position: position, filename: filename)
      block.call(import)

      post = Post.create!(title: title, date: date, position: position, released: true)

      import.images.each do |path|
        image = Image.create!(filename: File.basename(path), post: post)
        image.attach(path)
      end

      import.tags.each do |tag_name|
        post.tags << Tag.find_or_create(name: tag_name)
      end

      return post
    end
  end

  def initialize(title:, date:, position:, filename:)
    @title = title
    @date = date
    @position = position
    @images = Set.new([filename])
    @tags = Set.new
    @description = ""
  end

  def add_tags(*tags)
    tags.each { |tag| @tags << tag }
  end
end
