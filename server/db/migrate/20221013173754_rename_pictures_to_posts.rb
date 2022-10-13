class RenamePicturesToPosts < ActiveRecord::Migration[6.1]
  def up
    rename_table :pictures, :posts
    rename_table :pictures_tags, :posts_tags
    rename_table :galleries_pictures, :galleries_posts

    change_table :posts_tags do |t|
      t.rename :picture_id, :post_id
    end

    change_table :galleries_posts do |t|
      t.rename :picture_id, :post_id
    end

    create_table :images, id: :uuid do |t|
      t.belongs_to :post, type: :uuid

      t.string :filename, null: false
      t.integer :height
      t.integer :width
      t.string :mime_type
      t.string :ext
      t.integer :order, default: 0, null: false
    end

    execute(
      <<-SQL
        INSERT INTO images (id, post_id, filename, height, width, mime_type, ext)
        SELECT 
          id,
          id as post_id,
          CONCAT(slug, ext) as filename,
          height,
          width,
          mime_type,
          ext
        FROM
          posts
      SQL
    )

    change_table :posts do |t|
      t.remove :height
      t.remove :width
      t.remove :mime_type
      t.remove :ext
    end
  end

  def down
    rename_table :posts, :pictures
    rename_table :posts_tags, :pictures_tags
    rename_table :galleries_posts, :galleries_pictures

    change_table :pictures_tags do |t|
      t.rename :post_id, :picture_id
    end

    change_table :galleries_pictures do |t|
      t.rename :post_id, :picture_id
    end

    change_table :pictures do |t|
      t.integer :height
      t.integer :width
      t.string :mime_type
      t.string :ext
    end

    execute(
      <<-SQL
        UPDATE pictures
        SET
          height = images.height,
          width = images.width,
          mime_type = images.mime_type,
          ext = images.ext
        FROM
          images
        WHERE
          images.post_id = pictures.id
      SQL
    )

    drop_table :images
  end
end
