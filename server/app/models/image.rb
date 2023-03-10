class Image < ApplicationRecord
  belongs_to :post

  default_scope -> { order(:position).order(:filename) }

  after_destroy -> { PictureManager.remove(self) }

  # @param filename [string]
  def attach(filename)
    PictureManager.attach(self, filename)
  end

  def srcs
    srcs = {
      full: PictureManager.url_for(self, size: 'full')
    }

    PictureManager::SIZES.keys.map do |size|
      srcs[size] = PictureManager.url_for(self, size: size)
    end

    return srcs
  end
end
