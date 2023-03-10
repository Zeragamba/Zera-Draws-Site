class Gallery < ApplicationRecord
  include WithSlug

  has_many :gallery_posts, :dependent => :destroy

  def find_post(id_or_slug)
    if UUID.is_uuid?(id_or_slug)
      self.gallery_posts.where(post: { id: id_or_slug }).first
    else
      self.gallery_posts.where(post: { slug: id_or_slug }).first
    end
  end

  def build_slug
    self.name
  end
end
