class RenameOrderToPosition < ActiveRecord::Migration[6.1]
  def change
    rename_column(:posts, :order, :position)
    rename_column(:galleries, :order, :position)
    rename_column(:gallery_posts, :order, :position)
    rename_column(:images, :order, :position)
  end
end
