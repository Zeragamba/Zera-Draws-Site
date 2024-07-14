class TaggedPost < ApplicationRecord
  belongs_to :tag
  belongs_to :post

  scope :latest, -> { joins(:post).reorder("posts.position" => :desc) }
  scope :released, -> { Current.admin? ? all : joins(:post).where(posts: { released: true }) }

  eager_load :post

  def order
    return self.post.order
  end

  def next
    tagged_post = self.tag
      .tagged_posts
      .joins(:post)
      .order("posts.position ASC")
      .where("posts.position > :position", position: self.post.position)

    puts tagged_post.to_sql
    tagged_post = tagged_post.first

    raise ActiveRecord::RecordNotFound.new("Post not found") if !tagged_post
    return tagged_post
  end

  def prev
    tagged_post = self.tag
      .tagged_posts
      .joins(:post)
      .order("posts.position ASC")
      .where("posts.position < :position", position: self.post.position)

    puts tagged_post.to_sql
    tagged_post = tagged_post.last

    raise ActiveRecord::RecordNotFound.new("Post not found") if !tagged_post
    return tagged_post
  end
end
