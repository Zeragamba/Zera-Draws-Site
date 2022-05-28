class Picture < ApplicationRecord
  has_and_belongs_to_many :tags
  eager_load :tags

  validates_uniqueness_of :slug

  default_scope -> { order(date: :asc, order: :asc) }
  scope :released, -> { where(:released => true) }

  before_validation :update_slug

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

  def update_slug
    self.slug = Slug.to_slug(self.slug || "#{self.date}-#{self.title}")
  end

  def add_tags(*tag_names)
    tag_names.each do |tag_name|
      self.tags << Tag.find_or_create(tag_name)
    end

    return self
  end
end
