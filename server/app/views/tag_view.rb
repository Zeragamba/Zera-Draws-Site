class TagView < ApplicationView
  # @param tag [Tag]
  def self.as_json(tag)
    return {
      id: tag.id,
      name: tag.name,
      slug: tag.slug,
      num_posts: tag.tagged_posts.released.count,
      created_at: tag.created_at,
      updated_at: tag.updated_at,
    }
  end

  def self.render_one(tag)
    return { tag: self.as_json(tag) }
  end

  # @param tags [ActiveRecord::Relation<Tag>]
  # @param num_per_page [number]
  # @param page [number]
  def self.render_list(tags, num_per_page: 25, page: 0)
    skip = num_per_page * page

    if tags.count == 0
      return self.render_empty(model: :tags)
    end

    return self.render_many(
      model: :tags,
      data: tags.limit(num_per_page).offset(skip)
        .map { |tag| self.as_json(tag) },
      count: tags.count,
      page: page,
      total_pages: (tags.count / num_per_page.to_f).ceil,
    )
  end
end
