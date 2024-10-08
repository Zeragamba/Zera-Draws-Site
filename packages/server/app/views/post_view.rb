class PostView < ApplicationView
  # @param post [Post]
  def self.as_json(post)
    return GalleryPostView.as_json(post) if post.is_a? GalleryPost
    return TaggedPostView.as_json(post) if post.is_a? TaggedPost

    return {
      id: post.id,
      date: post.date,
      position: post.position,
      title: post.title,
      slug: post.slug,
      description: post.description,
      released: post.released,
      scheduled: post.scheduled,
      tags: post.tags.map { |tag| TagView.as_json(tag) },
      images: post.images.map { |image| ImageView.as_json(image) },
    }
  end

  # @param post [Post]
  def self.render(post)
    return self.render_one(model: :post, data: self.as_json(post))
  end

  # @param posts [ActiveRecord::Relation<Post>]
  # @param num_per_page [number]
  # @param page [number]
  def self.render_list(posts, num_per_page: 25, page: 0)
    skip = num_per_page * page

    posts = posts.includes(:tags, :images)

    return self.render_many(
      model: :posts,
      data: posts.limit(num_per_page).offset(skip)
        .map { |post| self.as_json(post) },
      count: posts.count,
      page: page,
      total_pages: (posts.count / num_per_page.to_f).ceil,
    )
  end
end
