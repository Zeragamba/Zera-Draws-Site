class ViewsView < ApplicationView
  # @param post [Post]
  def self.as_json(post)
    return {
      total: post.num_views(:all),
      unique: post.num_views(:unique),
    }
  end

  # @param post [Post]
  def self.render(post)
    return { views: self.as_json(post) }
  end
end
