class GalleryView < ApplicationView
  # @param gallery [Gallery]
  def self.as_json(gallery)
    return {
      id: gallery.id,
      name: gallery.name,
      slug: gallery.slug,
      order: gallery.order,
      created_at: gallery.created_at,
      updated_at: gallery.updated_at,
      posts: gallery.gallery_posts.map { |picture| GalleryPostView.as_json(picture) },
    }
  end

  # @param gallery [Gallery]
  def self.render(gallery)
    return self.render_one(
      model: :gallery,
      data: self.as_json(gallery)
    )
  end

  # @param galleries [ActiveRecord::Relation<Gallery>]
  def self.render_list(galleries, num_per_page: 25, page: 0)
    skip = num_per_page * page

    galleries = galleries.includes(:gallery_posts)

    return self.render_many(
      model: :gallery,
      data: galleries.limit(num_per_page).offset(skip)
        .map { |gallery| self.as_json(gallery) },
      count: galleries.count,
      page: page,
      total_pages: (galleries.count / num_per_page.to_f).ceil,
    )
  end
end
