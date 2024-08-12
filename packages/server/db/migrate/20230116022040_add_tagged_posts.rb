class AddTaggedPosts < ActiveRecord::Migration[6.1]
  def change
    rename_table(:posts_tags, :tagged_posts)
  end
end
