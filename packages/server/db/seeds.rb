connection = ActiveRecord::Base.connection
connection.execute("CREATE UNIQUE INDEX IF NOT EXISTS index_users_email ON users USING btree (lower(email));")
connection.execute "CREATE UNIQUE INDEX IF NOT EXISTS index_users_username ON users USING btree (lower(username));"

User.create(
  username: ENV.fetch('ADMIN_USER'),
  email: ENV.fetch('ADMIN_EMAIL'),
  password: ENV.fetch("ADMIN_PASS"),
  admin: true
)

Tag.create(
  name: 'Featured',
  slug: 'featured'
)
