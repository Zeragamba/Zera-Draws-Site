class Picture < ApplicationRecord
  has_and_belongs_to_many :tags
  eager_load :tags

  before_save :update_slug

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
