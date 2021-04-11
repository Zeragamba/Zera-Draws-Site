class Tag < ApplicationRecord
  has_and_belongs_to_many :pictures
  validates_uniqueness_of :name

  before_create :generate_slug

  def self.find_or_create(tag_name)
    slug = self.slug_for_name(tag_name)

    tag = Tag.find_by(slug: slug)
    tag ||= Tag.create(slug: slug, name: tag_name)

    return tag
  end

  def self.slug_for_name(name)
    return name.downcase.gsub(/[^\w\/]+/, "-")
  end

  def generate_slug
    self.slug = self.class.slug_for_name(self.name)
  end
end
