connection = ActiveRecord::Base.connection
connection.execute("CREATE UNIQUE INDEX IF NOT EXISTS index_users_email ON users USING btree (lower(email));")
connection.execute "CREATE UNIQUE INDEX IF NOT EXISTS index_users_username ON users USING btree (lower(username));"

SEED_DATA_DIR = Rails.root.join('data/seed_images')

User.create(username: Env.fetch('ADMIN_USER'), email: Env.fetch('ADMIN_EMAIL'), password: ENV.fetch("ADMIN_PASS"), admin: true)
Tag.create(name: 'featured', slug: 'featured')

require_relative './import_zera.rb'
