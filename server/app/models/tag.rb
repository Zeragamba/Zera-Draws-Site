class Tag < ApplicationRecord
  has_and_belongs_to_many :posts
  validates_uniqueness_of :name

  before_save :update_slug

  def self.find_or_create(tag_name)
    slug = Slug.to_slug(tag_name)

    tag = Tag.find_by(slug: slug)
    tag ||= Tag.create(slug: slug, name: tag_name)

    return tag
  end

  def update_slug
    self.slug = Slug.to_slug(self.name)
  end
end
