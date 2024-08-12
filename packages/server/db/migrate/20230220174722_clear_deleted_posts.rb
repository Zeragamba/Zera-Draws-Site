class ClearDeletedPosts < ActiveRecord::Migration[6.1]
  def up
    TaggedPost.left_joins(:post).where(:post => { id: nil }).destroy_all
    GalleryPost.left_joins(:post).where(:post => { id: nil }).destroy_all
  end
end
