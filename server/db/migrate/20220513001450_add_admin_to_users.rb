class AddAdminToUsers < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :admin, :boolean, default: false, null: false

    reversible do |dir|
      dir.up {
        execute("UPDATE users SET admin = true WHERE username = 'Zeragamba'")
        execute "CREATE UNIQUE INDEX index_users_email ON users USING btree (lower(email));"
        execute "CREATE UNIQUE INDEX index_users_username ON users USING btree (lower(username));"
      }
      dir.down {
        execute "DROP INDEX IF EXISTS index_users_email;"
        execute "DROP INDEX IF EXISTS index_users_username;"
      }
    end
  end
end
