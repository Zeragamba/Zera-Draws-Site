class PostView < ApplicationView
  # @param post [Post]
  def self.format(post)
    return {
      id: post.id,
      date: post.date,
      order: post.order,
      title: post.title,
      slug: post.slug,
      description: post.description,
      released: post.released,
      tags: post.tags,
      images: post.images.map { |image| ImageView.format(image) },
    }
  end

  # @param post [Post]
  def self.render(post)
    return self.render_one(
      model: :post,
      data: self.format(post)
    )
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
        .map { |post| self.format(post) },
      count: posts.count,
      page: page,
      total_pages: (posts.count / num_per_page.to_f).ceil,
    )
  end
end
