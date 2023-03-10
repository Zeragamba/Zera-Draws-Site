class TaggedPostView < ApplicationView
  # @param tagged_post [TaggedPost]
  def self.as_json(tagged_post)
    return PostView.as_json(tagged_post.post)
  end

  # @param tagged_post [TaggedPost]
  def self.render(tagged_post)
    return self.render_one(
      model: :post,
      data: PostView.as_json(tagged_post.post)
    )
  end

  # @param tagged_posts [ActiveRecord::Relation<TaggedPost>]
  # @param num_per_page [number]
  # @param page [number]
  def self.render_list(tagged_posts, num_per_page: 25, page: 0)
    skip = num_per_page * page

    return self.render_many(
      model: :posts,
      data: tagged_posts.limit(num_per_page).offset(skip)
        .map { |tagged_post| tagged_post.post }
        .map { |post| PostView.as_json(post) },
      count: tagged_posts.count,
      page: page,
      total_pages: (tagged_posts.count / num_per_page.to_f).ceil,
    )
  end
end
