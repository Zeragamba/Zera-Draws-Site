class PictureView < ApplicationView
  def self.format(picture)
    return {
      id: picture.id,
      date: picture.date,
      order: picture.order,
      title: picture.title,
      height: picture.height,
      width: picture.width,
      slug: picture.slug,
      mime_type: picture.mime_type,
      ext: picture.ext,
      description: picture.description,
      released: picture.released,
      srcs: picture.srcs,
      tags: picture.tags
    }
  end

  def self.render(picture)
    return self.render_one(
      model: :picture,
      data: self.format(picture)
    )
  end

  def self.render_list(pictures, num_per_page: 25, page: 0)
    skip = num_per_page * page

    pictures = pictures.includes(:tags)

    return self.render_many(
      model: :pictures,
      data: pictures.limit(num_per_page).offset(skip)
        .map { |picture| self.format(picture) },
      count: pictures.count,
      page: page,
      total_pages: (pictures.count / num_per_page.to_f).ceil,
    )
  end
end
