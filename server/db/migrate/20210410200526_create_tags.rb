class CreateTags < ActiveRecord::Migration[6.1]
  def change
    create_table :tags, id: :uuid do |t|
      t.string :name, null: false
      t.string :slug, null: false
      t.timestamps
    end

    add_index :tags, :name, unique: true
    add_index :tags, :slug, unique: true

    create_table :pictures_tags, id: false do |t|
      t.belongs_to :tag, :type => :uuid
      t.belongs_to :picture, :type => :uuid
    end
  end
end
