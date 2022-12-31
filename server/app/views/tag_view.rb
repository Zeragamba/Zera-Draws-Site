class TagView < ApplicationView
  # @param tag [Tag]
  def self.render(tag)
    return { tag: tag }
  end

  # @param tags [ActiveRecord::Relation<Tag>]
  # @param num_per_page [number]
  # @param page [number]
  def self.render_list(tags, num_per_page: 25, page: 0)
    skip = num_per_page * page

    return self.render_many(
      model: :tags,
      data: tags.limit(num_per_page).offset(skip),
      count: tags.count,
      page: page,
      total_pages: (tags.count / num_per_page.to_f).ceil,
    )
  end
end
