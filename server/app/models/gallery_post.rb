class GalleryPost < ApplicationRecord
  include WithPosition

  belongs_to :gallery
  belongs_to :post

  scope :latest, -> { joins(:post).reorder("position" => :desc) }
  scope :released, -> { Current.admin? ? all : joins(:post).where(posts: { released: true }) }

  eager_load :post

  def self.find(id_or_slug)
    if UUID.is_uuid?(id_or_slug)
      self.where(posts: { id: id_or_slug }).first
    else
      self.where(posts: { slug: id_or_slug }).first
    end
  end

  def next
    gallery_post = self.gallery
      .gallery_posts
      .where("position > :position", position: self.position)
      .first

    raise ActiveRecord::RecordNotFound if !gallery_post
    return gallery_post
  end

  def prev
    gallery_post = self.gallery
      .gallery_posts
      .where("position < :position", position: self.position)
      .last

    raise ActiveRecord::RecordNotFound if !gallery_post
    return gallery_post
  end
end
