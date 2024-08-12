class AddFeaturedFlagToTags < ActiveRecord::Migration[6.1]
  def change
    add_column :tags, :featured, :boolean, :default => false
  end
end
