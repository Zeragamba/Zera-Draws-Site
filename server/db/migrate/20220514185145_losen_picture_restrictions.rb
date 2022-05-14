class LosenPictureRestrictions < ActiveRecord::Migration[6.1]
  def up
    change_column :pictures, :height, :integer, null: true
    change_column :pictures, :width, :integer, null: true
    change_column :pictures, :ext, :string, null: true
    change_column :pictures, :mime_type, :string, null: true

    add_index :pictures, :title, unique: false
  end

  def down
    change_column :pictures, :height, :integer, null: false
    change_column :pictures, :width, :integer, null: false
    change_column :pictures, :ext, :string, null: false
    change_column :pictures, :mime_type, :string, null: false
  end
end
