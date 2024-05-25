class AddWebAuthnLogins < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :webauthn_id, :string, :unique => true

    create_table(:user_passkeys, :id => nil) do |t|
      t.belongs_to :user, :type => :uuid, :null => false

      t.string :webauthn_id, :primary => true
      t.string :public_key, :null => false
      t.numeric :sign_count, :null => false, :default => 0
      t.string :name, :null => false

      t.timestamps
    end

    add_index :user_passkeys, [:user_id, :name], unique: true
  end
end
