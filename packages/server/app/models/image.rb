class Image < ApplicationRecord
  belongs_to :post

  default_scope -> { order(:position).order(:filename) }

  after_destroy -> { ImageManager.remove(self) }

  # @param filename [string]
  def attach(filename)
    ImageManager.attach(self, filename)
  end

  def srcs
    srcs = {
      full: ImageManager.url_for(self, size: 'full')
    }

    ImageManager::SIZES.keys.map do |size|
      srcs[size] = ImageManager.url_for(self, size: size)
    end

    return srcs
  end
end
