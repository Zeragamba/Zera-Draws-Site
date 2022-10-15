class GalleryPost < ApplicationRecord
  include WithOrder

  belongs_to :gallery
  belongs_to :post

  scope :released, -> { where(post: { released: true }) }

  default_scope -> { order(order: :asc) }
end
