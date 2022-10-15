class Gallery < ApplicationRecord
  include WithSlug

  has_many :gallery_posts

  def build_slug
    self.name
  end
end
