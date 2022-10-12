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
end
