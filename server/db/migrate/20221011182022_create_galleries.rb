class CreateGalleries < ActiveRecord::Migration[6.1]
  def change
    create_table :galleries, id: :uuid do |t|
      t.string :name, unique: true, null: false, index: true
      t.string :slug, unique: true, null: false, index: true
      t.integer :order, default: 0, null: false, index: true

      t.timestamps
    end

    create_join_table :galleries, :pictures, column_options: { type: :uuid }

    reversible do |dir|
      dir.up do
        Gallery.create(name: 'Featured')
      end
    end
  end
end
