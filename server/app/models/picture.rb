class Picture < ApplicationRecord
  include WithSlug

  has_and_belongs_to_many :tags
  has_and_belongs_to_many :galleries
  eager_load :tags

  scope :latest_first, -> { order(date: :desc, order: :asc) }
  scope :released, -> { latest_first.where(:released => true) }

  default_scope -> { latest_first }

  def attach(filename)
    PictureManager.attach(self, filename)
  end

  def filename
    return self.slug + self.ext
  end

  def mime_type
    return Mime::Type.lookup_by_extension(self.ext.downcase.sub(/^\./, ''))
  end

  def srcs
    srcs = {
      full: PictureManager.url_for(self, size: 'full')
    }

    PictureManager::SIZES.keys.map do |size|
      srcs[size] = PictureManager.url_for(self, size: size)
    end

    return srcs
  end

  def build_slug
    "#{self.date}-#{self.title}"
  end

  def add_tags(*tag_names)
    tag_names.each do |tag_name|
      self.tags << Tag.find_or_create(tag_name)
    end

    return self
  end

  def as_json(options)
    options[:methods] ||= [:srcs]
    super(options)
  end
end
