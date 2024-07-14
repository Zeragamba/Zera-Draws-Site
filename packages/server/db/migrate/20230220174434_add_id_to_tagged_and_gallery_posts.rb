class AddIdToTaggedAndGalleryPosts < ActiveRecord::Migration[6.1]
  def change
    add_column(:tagged_posts, :id, :uuid, primary_key: true, default: -> { "gen_random_uuid()" })
    add_column(:gallery_posts, :id, :uuid, primary_key: true, default: -> { "gen_random_uuid()" })
  end
end
