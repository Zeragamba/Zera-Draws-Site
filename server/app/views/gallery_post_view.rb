class GalleryPostView < ApplicationView
  # @param post [GalleryPost]
  def self.format(gallery_post)
    post = PostView.format(gallery_post.post)
    post[:order] = gallery_post.order
    return post
  end

  # @param post [GalleryPost]
  def self.render(gallery_post)
    return self.render_one(
      model: :post,
      data: self.format(gallery_post)
    )
  end

  # @param posts [ActiveRecord::Relation<GalleryPost>]
  # @param num_per_page [number]
  # @param page [number]
  def self.render_list(gallery_posts, num_per_page: 25, page: 0)
    skip = num_per_page * page

    return self.render_many(
      model: :posts,
      data: gallery_posts.limit(num_per_page).offset(skip)
        .map { |post| self.format(post) },
      count: gallery_posts.count,
      page: page,
      total_pages: (gallery_posts.count / num_per_page.to_f).ceil,
    )
  end
end
