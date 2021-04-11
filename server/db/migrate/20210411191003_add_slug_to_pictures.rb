class AddSlugToPictures < ActiveRecord::Migration[6.1]
  def change
    add_column :pictures, :slug, :string

    reversible do |change|
      change.up {
        Picture.all.each { |p| p.update_slug; p.save }
        Tag.all.each { |t| t.update_slug; t.save }
        change_column :pictures, :slug, :string, :null => true
      }
      change.down {
        change_column :pictures, :slug, :string
      }
    end

    add_index :pictures, :slug, :unique => true
  end
end
