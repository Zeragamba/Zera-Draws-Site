class Tag < ApplicationRecord
  include WithSlug

  has_many :tagged_posts, :dependent => :destroy

  validates_uniqueness_of :name

  def find_post(id_or_slug)
    tagged_posts = self.tagged_posts
      .joins(:post)
      .order("posts.position ASC")

    if UUID.is_uuid?(id_or_slug)
      return tagged_posts.where(posts: { id: id_or_slug }).first
    else
      return tagged_posts.where(posts: { slug: id_or_slug }).first
    end
  end

  def self.find_or_create(name:)
    slug = Slug.to_slug(name)

    tag = Tag.find_by(slug: slug)
    tag ||= Tag.create(slug: slug, name: name)

    return tag
  end
end
