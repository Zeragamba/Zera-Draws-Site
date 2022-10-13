class GalleryView < ApplicationView
  def self.format(gallery)
    return {
      id: gallery.id,
      name: gallery.name,
      slug: gallery.slug,
      order: gallery.order,
      created_at: gallery.created_at,
      updated_at: gallery.updated_at,
      pictures: gallery.posts.map { |picture| PostView.format(picture) },
    }
  end

  def self.render(gallery)
    return self.render_one(
      model: :gallery,
      data: self.format(gallery)
    )
  end

  def self.render_list(galleries, num_per_page: 25, page: 0)
    skip = num_per_page * page

    return self.render_many(
      model: :gallery,
      data: galleries.limit(num_per_page).offset(skip),
      count: galleries.count,
      page: page,
      total_pages: (galleries.count / num_per_page.to_f).ceil,
    )
  end
end
