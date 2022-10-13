class Post < ApplicationRecord
  include WithSlug

  has_and_belongs_to_many :tags
  has_and_belongs_to_many :galleries
  has_many :images

  eager_load :tags
  eager_load :images

  scope :latest_first, -> { order(date: :desc, order: :asc) }
  scope :released, -> { latest_first.where(:released => true) }

  default_scope -> { latest_first }

  def build_slug
    "#{self.date}-#{self.title}"
  end

  def add_tags(*tag_names)
    tag_names.each do |tag_name|
      self.tags << Tag.find_or_create(tag_name)
    end

    return self
  end
end
