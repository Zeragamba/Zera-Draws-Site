class AddOrderToGalleryPost < ActiveRecord::Migration[6.1]
  def up
    rename_table :galleries_posts, :gallery_posts
    add_column :gallery_posts, :order, :integer, null: false

    execute(
      <<-SQL
UPDATE posts
SET
    "order" = post_order.new_order
FROM
    (
        SELECT
            posts.id AS post_id,
            ROW_NUMBER() OVER (ORDER BY posts.date, posts.order) AS new_order
        FROM
            posts
    ) AS post_order
WHERE
    posts.id = post_order.post_id;
    SQL
    )

    change_column :posts, :order, :integer, null: false, unique: true
  end

  def down
    remove_column :gallery_posts, :order
    rename_table :gallery_posts, :galleries_posts

    change_column :posts, :order, :integer, default: 0, null: false, unique: false, auto_increment: false
  end
end
