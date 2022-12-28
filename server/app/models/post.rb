class Post < ApplicationRecord
  include WithSlug
  include WithOrder

  has_and_belongs_to_many :tags
  has_many :gallery_posts
  has_many :images

  eager_load :tags
  eager_load :images

  scope :latest, -> { reorder(date: :desc, order: :desc) }
  scope :released, -> { where(:released => true) }

  default_scope -> { order(order: :desc) }

  before_create -> { self.order = Post.count if self.order == 0 }

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
