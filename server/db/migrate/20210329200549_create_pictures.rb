class CreatePictures < ActiveRecord::Migration[6.1]
  def change
    enable_extension 'pgcrypto'

    create_table :pictures, id: :uuid do |t|
      t.date :date, nillable: false
      t.integer :order, nillable: false, default: 0
      t.string :title, nillable: false
      t.string :filename, nillable: false
      t.string :mime_type, nillable: false
    end
  end
end
