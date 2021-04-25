class Picture < ApplicationRecord
  has_and_belongs_to_many :tags
  eager_load :tags

  before_save :update_slug

  def filename
    return self.slug + self.ext
  end

  def mime_type
    return Mime::Type.lookup_by_extension(self.ext.downcase.sub(/^\./, ''))
  end

  def srcs
    srcs = {
      full: [PictureManager::IMAGES_URL, self.id, "full#{self.ext}"].join('/')
    }
    PictureManager::SIZES.keys.map do |size|
      srcs[size] = [PictureManager::IMAGES_URL, self.id, size.to_s + self.ext].join('/')
    end

    return srcs
  end

  def update_slug
    self.slug = Slug.to_slug(self.title)
  end

  def add_tags(*tag_names)
    tag_names.each do |tag_name|
      self.tags << Tag.find_or_create(tag_name)
    end

    return self
  end
end
