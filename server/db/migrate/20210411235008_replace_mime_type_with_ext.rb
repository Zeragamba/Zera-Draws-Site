class ReplaceMimeTypeWithExt < ActiveRecord::Migration[6.1]
  def up
    add_column :pictures, :ext, :string
    remove_column :pictures, :mime_type, :string, :null => false
    remove_column :pictures, :filename, :string, :null => false

    query("UPDATE pictures SET ext = 'blob' WHERE 1=1")
    change_column :pictures, :ext, :string, :null => false
  end

  def down
    raise ActiveRecord::MigrationError.new("Not reversible")
  end
end
