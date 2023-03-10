class ApplicationView
  def self.render_one(model:, data:)
    return {
      model => data
    }
  end

  def self.render_many(model:, data:, count:, page:, total_pages:)
    return {
      count: count,
      page: page,
      total_pages: total_pages,
      model => data,
    }
  end

  def self.render_empty(model:)
    return self.render_many(
      model: model,
      count: 0,
      page: 0,
      total_pages: 0,
      data: [],
    )
  end
end
