class AddDescriptionToPictures < ActiveRecord::Migration[6.1]
  def change
    add_column :pictures, :description, :text
    add_column :pictures, :released, :boolean, default: false, null: false

    reversible do |dir|
      dir.up { execute "UPDATE pictures SET released = true WHERE 1=1" }
    end
  end
end
