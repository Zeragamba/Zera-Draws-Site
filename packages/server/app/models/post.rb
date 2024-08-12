class Post < ApplicationRecord
  include WithSlug
  include WithPosition

  has_many :gallery_posts, dependent: :destroy
  has_many :tagged_posts, dependent: :destroy
  has_many :views, dependent: :destroy

  has_many :tags, :through => :tagged_posts
  eager_load :tags

  has_many :images, dependent: :destroy
  eager_load :images

  default_scope -> { latest }
  scope :latest, -> { reorder(position: :desc) }
  scope :released, -> { Current.admin? ? all : where(released: true) }

  validates :slug, exclusion: {
    in: ['recent', 'latest', 'first'],
    message: '%{value} is reserved'
  }

  def self.release_scheduled
    self
      .where("scheduled <= NOW()")
      .update_all(released: true, scheduled: nil)
  end

  def build_slug
    return "#{self.date.strftime("%Y-%m-%d")}-#{self.title}"
  end

  def next
    return Post
      .where("position > :position", position: self.position)
      .last
  end

  def prev
    return Post
      .where("position < :position", position: self.position)
      .first
  end

  def update_tags!(tag_ids)
    if tag_ids === "__none__"
      self.tag_ids = []
    else
      self.tag_ids = tag_ids
    end

    self.save!
  end

  def num_views(type = :all)
    case type
      when :all
        return self.views.count
      when :unique
        return self.views.distinct.count(:viewer_id)
    end
  end

  def add_tags(*tag_names)
    tag_names.each do |tag_name|
      self.tags << Tag.find_or_create(name: tag_name)
    end

    return self
  end
end
