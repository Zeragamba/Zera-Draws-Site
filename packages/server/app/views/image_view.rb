class ImageView < ApplicationView
  # @param image [Image]
  def self.as_json(image)
    return {
      id: image.id,
      position: image.position,
      filename: image.filename,
      height: image.height,
      width: image.width,
      mime_type: image.mime_type,
      ext: image.ext,
      srcs: image.srcs
    }
  end

  # @param image [Image]
  def self.render(image)
    return self.render_one(
      model: :image,
      data: self.as_json(image)
    )
  end

  # @param images [ActiveRecord::Relation<Image>]
  # @param num_per_page [number]
  # @param page [number]
  def self.render_list(images, num_per_page: 25, page: 0)
    skip = num_per_page * page

    return self.render_many(
      model: :images,
      data: images.limit(num_per_page).offset(skip)
        .map { |image| self.as_json(image) },
      count: images.count,
      page: page,
      total_pages: (images.count / num_per_page.to_f).ceil,
    )
  end
end
