class Tag < ApplicationRecord
  include WithSlug

  has_and_belongs_to_many :posts
  validates_uniqueness_of :name

  def self.find_or_create(name:)
    slug = Slug.to_slug(name)

    tag = Tag.find_by(slug: slug)
    tag ||= Tag.create(slug: slug, name: name)

    return tag
  end
end
